# @usemcpkit/servers

The server definitions mcpkit ships, and the generators that write most of them. Private: the build turns
`src/servers` into the JSON registry that CI publishes to GitHub Pages.

```
src/servers/<name>/<name>.ts            one defineServer export per server
src/servers/<name>/tools/<resource>/<action>.ts      one tool per file
src/servers/<name>/tools/<group>/<resource>/<action>.ts   grouped servers (github, gitlab, jira, confluence, clickup, discord, reddit)
src/providers/<name>/                   manifest base shared by a provider's tools (host, headers, auth, editions)
generator/                              OpenAPI → server definitions
plugins/manifests/                      Vite plugin: compiles and validates src/servers, writes build/manifests
```

`yarn build` (in this package) compiles every server into `build/manifests/`: `index.json` plus
`<category>/<server>.json`. An invalid definition fails the build. A server whose tools are all named
`<group>:<resource>:<action>` is written as a shell (the manifest without tools, listing its parts with checksums) plus
one `<category>/<server>/<group>.json` per group; the index lists one server and the CLI downloads only the group a
tool belongs to. `src/main.ts` only exports `DEFAULT_REGISTRY_URL`.

## Adding a server by hand

Create `src/servers/<name>/<name>.ts` with exactly one named export built with `defineServer` from
`@usemcpkit/core`. Folder dashes become underscores in the server name (`my-api` → `my_api`). Put each tool in
`tools/<resource>/<action>.ts` (the tool `pull_request:list` lives in `tools/pull-request/list.ts`) and shared
params in `const.ts`. Servers that live in a category folder (`servers/<category>/<name>`) are found the same way.

## Bundled servers

| Server | Category | Hosts | Tools |
| --- | --- | --- | --- |
| `github` | `git` | github.com, GitHub Enterprise Server, GHE.com | the GitHub REST API (1,242 operations), tools named `<group>:<resource>:<action>`, for example `repos:branches:list` |
| `gitlab` | `git` | gitlab.com, self-managed GitLab (`<host>[/<relative url root>]`) | the GitLab REST API (1,686 operations), for example `projects:projects:list_projects_issues`, `issues:notes:create_projects_merge_requests_notes` |
| `jira` | `atlassian` | Jira Cloud (`<site>.atlassian.net`), Jira Data Center | the Jira platform REST API (`/rest/api/2`) and Jira Software boards and sprints (`software:`), 649 tools, for example `issues:issues:create_issue`, `software:board:get_all_boards`; the JQL search picks the Cloud or Data Center endpoint from the host (editions) |
| `confluence` | `atlassian` | Confluence Cloud, Confluence Data Center | 562 operations in three groups: `cloud` (REST v2, `cloud:pages:create_page`), `cloud_v1` (REST v1, `cloud_v1:search:search_by_cql`) and `datacenter` (`datacenter:content:create`); call the group that matches the host |
| `clickup` | `productivity` | ClickUp (`api.clickup.com`) | the ClickUp REST API v2 and v3 (171 operations) in eight groups, for example `tasks:tasks:get_tasks`, `hierarchy:lists:create_list`, `docs:docs:search_for_docs` |
| `discord` | `communication` | Discord (`discord.com/api/v10`) | the Discord HTTP API v10 as a bot (241 operations) in eight groups, for example `channels:messages:create_message`, `guilds:roles:list_guild_roles`, `webhooks:webhooks:execute_webhook` |
| `reddit` | `communication` | Reddit (`oauth.reddit.com`) | 11 read tools in four groups from a hand-written OpenAPI subset, for example `posts:posts:list_subreddit_posts`, `posts:comments:get_post_comments`, `users:comments:list_user_comments` |

GitLab reads `GITLAB_HOST` (default `gitlab.com`) and a personal access token in `GITLAB_TOKEN`. Tools take a project
id or its full path (`group/subgroup/project`) as `id`; issue and merge request numbers are the per-project `iid`.

Jira and Confluence ask for the host first (`JIRA_HOST` / `CONFLUENCE_HOST`, for example `acme.atlassian.net` or
`jira.example.com/jira`), then for **Cloud: email + API token** (`JIRA_USERNAME` + `JIRA_API_TOKEN`,
`CONFLUENCE_USERNAME` + `CONFLUENCE_API_TOKEN`) or **Data Center: personal access token** (`JIRA_PERSONAL_TOKEN`,
`CONFLUENCE_PERSONAL_TOKEN`). On Jira Cloud, `search_issues` returns the first `max_results` issues only (`start_at` is
Data Center only); Confluence Cloud v2 tools take a space id instead of a space key.

ClickUp reads a personal API token in `CLICKUP_API_TOKEN` and sends it unprefixed as `Authorization`. The v2 tools call
the Workspace id `team_id`; array filters (`statuses`, `assignees`, `tags`…) are sent as `<name>[]`, one per item.

Discord reads a bot token in `DISCORD_BOT_TOKEN` and sends it as `Authorization: Bot <token>`. The spec has no tags: the
first path segment picks the group and the next one the resource; endpoints that accept only a user's OAuth2 token are
skipped.

Reddit reads an OAuth access token in `REDDIT_ACCESS_TOKEN` (scopes `read`, `identity`) and sends a descriptive
`User-Agent`, which Reddit requires. Reddit publishes no OpenAPI description, so the generator reads one written by hand
in `generator/providers/reddit/openapi.json`; add an endpoint there and regenerate. Each operation's tags are
`[group, resource]`, and its 200 schema (a listing, a thing or a plain object) lists the fields the tool returns, so
listings come back trimmed; page with `after` set to the last item's `name`.

## Generators

`github`, `gitlab`, `jira`, `confluence`, `clickup`, `discord` and `reddit` are generated from OpenAPI descriptions (Reddit's written by hand, since it publishes none). Never edit the
generated files by hand; change the generator and run it again. The generator formats its own output with Biome.

```bash
yarn workspace @usemcpkit/servers generate                    # every provider
yarn workspace @usemcpkit/servers generate github             # one provider
yarn workspace @usemcpkit/servers generate github spec.json   # one provider from a local spec
yarn workspace @usemcpkit/servers generate confluence cloud-v2.json cloud-v1.json datacenter.json
yarn workspace @usemcpkit/servers generate jira platform.json software.json
yarn workspace @usemcpkit/servers generate clickup v2.json v3.yaml
yarn workspace @usemcpkit/servers generate discord openapi.json
```

Local spec paths are matched, in order, to the provider's specs: `github` one OpenAPI JSON, `gitlab` one OpenAPI YAML,
`jira` the platform and software documents, `confluence` Cloud v2, Cloud v1 and Data Center, `clickup` the v2 and v3 documents, `discord` one OpenAPI JSON. Without paths the
generator downloads them (URLs in each provider's `const.ts`).

Layout:

```
generator/main.ts                       CLI: provider name + optional local spec paths
generator/providers/<name>/             const.ts (spec URLs, groups, naming, exclusions, download paths),
                                        create-spec-plan.ts (the typed SpecPlan), generate.ts (wires runGenerator)
generator/utils/                        code the providers share, parameterized by options, never copied:
  spec/      reading specs, $ref inlining, collecting operations
  schema/    OpenAPI schema → JSON Schema (SchemaOptions), body arguments
  support/   unsupported-operation reasons, body content selection, download detection
  tool/      tool definitions (query, headers, fixed values, saveTo, file args)
  naming/    group, resource and action names, ArgumentNaming
  render/    server, group, resource and tool files
  pipeline/  planSpec (reasons, exclusions, naming) and runGenerator
```

A provider describes itself with `SchemaOptions`, `ArgumentNaming` and a `SpecPlan` (`readDocument`,
`collectOperations`, `isExcluded`, `findUnsupportedReason`, `nameOperations`, `buildToolDefinition`). To add a
provider, add `generator/providers/<name>/` with those pieces; `generate` finds it by folder name.

What a generator turns into manifest features, from the spec:

- request bodies: JSON properties, a whole-body argument (`bodyArg`) for arrays and free-form objects, `text/*` and
  `+json` types (`contentType`), `multipart/form-data` and binary uploads (`fileArgs`; Jira `filePartName` for a body
  that is only an array of files);
- constant headers the spec requires (`fixedHeaders`), comma-joined array queries (`commaQuery`);
- downloads: a GET with no readable response type, or a path in the provider's `DOWNLOAD_PATHS`, gets a required
  `save_to` argument (`saveToArg`); `OCTET_STREAM_PATHS` (GitHub release assets) also send `Accept: application/octet-stream`;
- `EDITION_PAIRS` (Jira): operations Cloud replaced are merged with their successors into one tool with a `cloud` edition.

Operations that cannot be expressed are skipped and listed in the run's output with a reason. Operations left out on
purpose (`isExcluded`, for example GitLab's `Packages:*` and internal endpoints) are not reported.
