# usemcpkit

Many MCP servers in one binary. Each server is a **JSON manifest** that describes its
API, auth, tools and response mapping. A generic executor runs those manifests.

## Repository layout

```
packages/core      @usemcpkit/core       library: manifest format, SDK, form contract (publishable)
packages/servers   @usemcpkit/servers    server definitions and generators, compiled into the registry (private)
packages/ui        @usemcpkit/ui         Svelte pages the server shows, e.g. the credentials form (private)
packages/testing   @usemcpkit/testing    shared test fixtures (private)
apps/runner        usemcpkit-runner      the usemcpkit binary: commands, installing, the supervisor (Rust)
apps/server        usemcpkit-servers     the usemcpkit-servers binary: MCP stdio server, credentials window (Rust)
apps/npx           usemcpkit             wrapper so `npx usemcpkit` runs the binary of this platform
apps/analytics     @usemcpkit/analytics  usage-reporting Worker
crates/*                                 the Rust libraries behind the binaries
```

Yarn 4 workspaces and Nx, Node 22.18+, and a Rust toolchain with `cargo` on PATH. Every command below runs from the
repository root.

```bash
yarn install
yarn build          # every package; packages/servers/build/manifests/ + target/release/usemcpkit[-servers]
                    #   then a copy of every build and the Rust release binaries in build/
yarn test
yarn typecheck
yarn lint           # Biome: lint + format + import order check per project
yarn format         # Biome: apply formatting and safe fixes across the repo
```

Every package builds from `src/main.ts` into `build/usemcpkit.<package>.js` (`usemcpkit.core.d.ts` for the published types,
`usemcpkit.ui.html` for the UI page). Nx runs `lint`, `typecheck` and `test` before every `build`, and builds dependencies first.

## Install

```bash
npx usemcpkit
```

This finds the AI clients installed for the current user, asks which ones to set up, copies the usemcpkit binary for
this OS to `~/.usemcpkit/bin/usemcpkit` and adds one `usemcpkit` entry (`<binary> serve`, every server) to each chosen client.
Running it again updates the entries in place. Only the `usemcpkit` key is touched: comments and other keys stay, and the
previous file is kept as `<config>.usemcpkit-backup`. Restart the clients afterwards (later updates reload live).

```bash
npx usemcpkit --all                         # every detected client, no checklist (needed without a terminal)
npx usemcpkit --clients cursor,codex        # only these
usemcpkit install --binary ./usemcpkit         # install a local binary instead of downloading one
usemcpkit uninstall [--all | --clients ...] # remove the entry; the binary stays
usemcpkit update                            # refresh the cached manifests now
usemcpkit upgrade                           # update the cached manifests, then the installed binary
```

Supported clients (ids): `claude-desktop`, `claude-code` (`~/.claude.json`), `cursor`, `vscode`, `vscode-insiders`
(`servers` in the user `mcp.json`), `devin-desktop` (Windsurf's new home), `windsurf` (legacy `~/.codeium/windsurf`),
`cline` (`~/.cline`), `roo-code`, `copilot-cli`, `codex` (TOML), `gemini-cli`, `zed` (`context_servers`), `opencode`
(`mcp`), `kiro`, `lm-studio`, `junie`, `warp`. A client counts as installed when its config directory exists. Each
client's path and entry shape lives in `crates/clients/src/definitions/<id>.rs`.

**Where the binary comes from.** `npx usemcpkit` runs the `usemcpkit` binary of the `@usemcpkit/cli-<target>` package
npm installed for this machine (for example `@usemcpkit/cli-darwin-arm64`, `@usemcpkit/cli-linux-x64-musl`), which holds
it and `usemcpkit-servers`. Installing copies both. A runner with no `usemcpkit-servers` beside it downloads
`@usemcpkit/cli-<target>` at its own version from the npm registry and checks the tarball against its published
`sha512` integrity. Building and publishing those packages is release work, see `docs/rust-port.md`.

**Auto-update.** `usemcpkit serve`, when it is the installed binary, checks the npm registry at most every six hours
(`~/.usemcpkit/update-state.json`) in the background: at start, and then every hour for as long as it runs, so a server
that stays up for days still finds a new release. A newer release replaces the binary and is picked up without
restarting the client, see Live reload. `USEMCPKIT_AUTO_UPDATE=0` turns this off, `USEMCPKIT_NPM_REGISTRY` points at another
registry.

**Live reload.** A compiled `usemcpkit serve` is a small supervisor: it keeps the client's stdio connection and runs the
real server as a worker (`usemcpkit serve --worker`). It polls its own binary file and, once the file was replaced and
stayed the same for two polls (3 s each), starts the new binary as a second worker, replays the client's `initialize`
handshake to it and only then switches new requests over. The old worker finishes the requests it already has (up to
5 minutes) and exits. The client is told with `notifications/tools/list_changed`, which the server advertises as
`tools.listChanged`, so new and changed tools show up without a restart. The same applies when you copy a rebuilt
binary over `~/.usemcpkit/bin/usemcpkit` or when auto-update downloads a release. If the new binary fails to answer
`initialize` within 15 s, the running server stays and the reason is logged to stderr. The supervisor itself is not
swapped: a release that changes it needs one client restart. Clients that ignore `list_changed` need a restart to see
changed tool lists; calls always run on the new server. A Homebrew upgrade moves the binary to a new `Cellar/<version>`
folder, so that install is not reloaded live.

**Homebrew and winget.** The package only installs the binary. Running `usemcpkit` afterwards shows the same client
checklist. A binary under Homebrew's `Cellar/usemcpkit/<version>` is used in place: clients get `<prefix>/bin/usemcpkit`,
the link Homebrew moves on every upgrade. A winget binary under `WinGet\Packages\<id>_…` is also used in place. Neither
is copied to `~/.usemcpkit/bin` or updated by usemcpkit; `usemcpkit upgrade` prints the `brew upgrade` / `winget upgrade`
command instead. The Homebrew formula's `caveats` and the winget manifest's `InstallationNotes` should say "Run
`usemcpkit` to set up your AI clients."

## CLI

```
packages/servers/src/servers/gitlab/gitlab.ts   author servers in TypeScript (one folder per server, one tool per file)
  └─ vite build                          packages/servers: plugins/manifests/ compiles + validates src/servers/*
       └─ build/manifests/*.json          compiled manifests + index.json (the registry; CI publishes it to GitHub Pages)
cargo build --release                    apps/runner + apps/server, no manifests inside
  ├─ target/release/usemcpkit            commands and the supervisor that owns the client's stdio
  └─ target/release/usemcpkit-servers    the MCP server it runs, which downloads manifests from the registry
```

An invalid server definition fails the build. The build log lists each compiled manifest:

```
usemcpkit: 1 manifest(s) → build/manifests
  github  1.0.0  1239 tools  bearer GITHUB_TOKEN  1.8 MB
```

### Adding a server

Create `packages/servers/src/<name>/<name>.ts` with exactly one named export built with `defineServer`
from `@usemcpkit/core`. Folder dashes become underscores in the server name (`my-api` → `my_api`).
Put each tool in `packages/servers/src/<name>/tools/<resource>/<action>.ts` (the tool `pull_request:list` lives in `tools/pull-request/list.ts`) and shared params in `const.ts`.

### Use with an MCP client

`npx usemcpkit` writes the entry for you (see Install). By hand:

```json
{
  "mcpServers": {
    "usemcpkit": {
      "command": "/Users/me/.usemcpkit/bin/usemcpkit",
      "args": ["serve"]
    }
  }
}
```

`usemcpkit serve` with no names serves every server; `usemcpkit serve github` only some. Tools are named `<server>_<tool>`.

### Bundled servers

| Server | Category | Hosts | Tools |
| --- | --- | --- | --- |
| `github` | `git` | github.com, GitHub Enterprise Server, GHE.com | the whole GitHub REST API (1,239 operations), tools named after its operation ids, for example `pulls:list`, `issues:create`, `repos:get_content`; generated by `yarn workspace @usemcpkit/servers generate:github` |
| `gitlab` | `git` | gitlab.com, self-managed GitLab (`<host>[/<relative url root>]`) | the GitLab REST API (1,648 operations), tools named `<group>:<resource>:<action>` after the API tag and path, for example `projects:projects:list_projects_issues`, `issues:notes:create_projects_merge_requests_notes`; generated by `yarn workspace @usemcpkit/servers generate:gitlab` |
| `jira` | `atlassian` | Jira Cloud (`<site>.atlassian.net`), Jira Data Center | the Jira platform REST API (`/rest/api/2`, 625 tools with Jira Software boards and sprints under `software:`), named `<group>:<resource>:<action>`, for example `issues:issues:create_issue`, `issues:issue_search:search_and_reconsile_issues_using_jql` (picks the Cloud or Data Center endpoint), `software:board:get_all_boards`; generated by `yarn workspace @usemcpkit/servers generate:jira` |
| `confluence` | `atlassian` | Confluence Cloud (`<site>.atlassian.net`), Confluence Data Center | the Confluence REST APIs (529 operations) in three groups: `cloud` (Cloud REST v2, for example `cloud:pages:create_page`), `cloud_v1` (Cloud REST v1, `cloud_v1:search:search_by_cql`) and `datacenter` (Data Center 10.2 REST, `datacenter:content:create`); generated by `yarn workspace @usemcpkit/servers generate:confluence` |
| `clickup` | `productivity` | ClickUp (`api.clickup.com`) | the ClickUp REST API v2 and v3 (171 operations) in eight groups (`tasks`, `hierarchy`, `time`, `goals`, `users`, `chat`, `docs`, `admin`), named `<group>:<resource>:<action>` after the operation summary, for example `tasks:tasks:get_tasks`, `hierarchy:lists:create_list`, `docs:docs:search_for_docs`; generated by `yarn workspace @usemcpkit/servers generate clickup` |
| `discord` | `communication` | Discord (`discord.com/api/v10`) | the Discord HTTP API v10 as a bot (241 operations) in eight groups (`channels`, `guilds`, `users`, `applications`, `webhooks`, `invites`, `lobbies`, `global`), named `<group>:<resource>:<action>` after the operation id, for example `channels:messages:create_message`, `guilds:members:list_guild_members`, `users:guilds:list_my_guilds`; generated by `yarn workspace @usemcpkit/servers generate discord` |
| `figma` | `design` | Figma (`api.figma.com`) | the Figma REST API with a personal access token (50 operations) in five groups (`files`, `library`, `projects`, `users`, `webhooks`), named `<group>:<resource>:<action>` after the operation id, for example `files:files:get_file_nodes`, `files:comments:post_comment`, `library:components:get_file_components`, `library:variables:get_local_variables`; generated by `yarn workspace @usemcpkit/servers generate figma` |
| `n8n` | `automation` | n8n Cloud (`<name>.app.n8n.cloud`), self-hosted n8n (`<host>[/<path>]`, HTTPS) | the n8n public REST API (169 operations) in seven groups (`workflows`, `credentials`, `data_tables`, `projects`, `users`, `settings`, `instance`), named `<group>:<resource>:<action>` after the operation id, for example `workflows:workflows:get_workflows`, `workflows:workflows:publish_workflow`, `workflows:executions:retry_execution`, `data_tables:tables:create_data_table_rows`; generated by `yarn workspace @usemcpkit/servers generate n8n` |
| `cloudflare` | `cloud` | Cloudflare (`mcp.cloudflare.com`) | Cloudflare's own remote MCP server in code mode, reached as an HTTP upstream: `api:spec:search` and `api:requests:execute` take JavaScript that searches the OpenAPI spec and calls any Cloudflare API endpoint, plus `docs:docs:search` and `account:account:whoami`; see `servers/cloudflare` |
| `postman` | `api` | Postman (`mcp.postman.com`) | Postman's own remote MCP server in its Full mode (234 tools), reached as an HTTP upstream and opened by group: `collections`, `environments`, `mocks`, `monitors`, `specs`, `workspaces`, `catalog`, `governance` and more, for example `collections:requests:create`, `environments:environments:list`; see `servers/postman` |
| `teams` | `communication` | Microsoft Teams (Microsoft Graph) | the community Teams MCP server by Inditex, cloned on first use and run locally with uv, in the one team and channel it is configured for: `channel:threads:start`, `channel:threads:update`, `channel:threads:read`, `channel:threads:list`, `team:members:list` and `team:members:get_by_name`; see `servers/teams` |
| `medium` | `communication` | Medium (`api.medium.com`) | Medium's archived API, which needs an integration token you already have: `account:me:get_me`, `publications:publications:list_user_publications`, `publications:contributors:list_publication_contributors`, `posts:posts:create_post`, `posts:posts:create_publication_post` (HTML or Markdown, draft, unlisted or public) and `images:images:upload_image`; it cannot read, edit or delete posts; generated by `yarn workspace @usemcpkit/servers generate medium` |

GitLab reads `GITLAB_HOST` (default `gitlab.com`) and a personal access token in `GITLAB_TOKEN`. Tools take a project
id or its full path (`group/subgroup/project`) as `id`, and issue and merge request numbers are the per-project `iid`.

Jira and Confluence ask for the host first (`JIRA_HOST` / `CONFLUENCE_HOST`, for example `acme.atlassian.net` or
`jira.example.com/jira`), then for one of two options: **Cloud: email + API token** (`JIRA_USERNAME` +
`JIRA_API_TOKEN`, `CONFLUENCE_USERNAME` + `CONFLUENCE_API_TOKEN`) or **Data Center: personal access token**
(`JIRA_PERSONAL_TOKEN`, `CONFLUENCE_PERSONAL_TOKEN`). Cloud and Data Center use different endpoints where Atlassian
removed the old ones on Cloud (Jira issue search); the host picks them, see Editions. Confluence names the deployment in the tool group instead: call `cloud` or `cloud_v1` tools on a `*.atlassian.net` host and `datacenter` tools on Data Center.
On Cloud, `search_issues` returns the first `max_results` issues only (`start_at` is Data Center only), and
Confluence Cloud v2 tools take a space id (`cloud:spaces:get_spaces`) instead of a space key.

ClickUp reads a personal API token (`pk_…`, from Settings → Apps) in `CLICKUP_API_TOKEN` and sends it as the
`Authorization` header. The v2 tools call the Workspace id `team_id` (`hierarchy:workspaces:get_authorized_workspaces`
lists them), and array filters such as `statuses` take a list.

Discord reads a bot token (Developer Portal → your application → Bot) in `DISCORD_BOT_TOKEN` and sends it as
`Authorization: Bot <token>`; the bot must be in a guild to reach its channels. Ids are snowflakes passed as strings. The
five endpoints that accept only a user's OAuth2 token are left out. To read message text, turn on the privileged
Message Content intent on the Bot page; without it Discord returns other users' guild messages with an empty `content`.

Figma reads a personal access token (`figd_…`, Settings → Security → Personal access tokens, with the scopes you need such
as File content or Comments) in `FIGMA_ACCESS_TOKEN` and sends it as `X-Figma-Token`. A file key is the part after
`/design/` in a Figma link, and a node id looks like `1:2` (`node-id=1-2` in a link). `files:files:get_file` returns the
whole document and can be enormous: read parts with `files:files:get_file_nodes` and `ids`, or pass `depth`. The nine
operations that accept only an OAuth app or an organization plan token (teams, folder metadata, logs, AI usage,
duplicating a file) are left out, and variables need an Enterprise plan.

n8n asks for the instance host first (`N8N_HOST`, for example `acme.app.n8n.cloud` or `n8n.example.com/automation`; the
field also offers `app.n8n.cloud` and `localhost:5678`, neither picked by default), then for an API key (n8n → Settings →
n8n API) in `N8N_API_KEY`, sent as `X-N8N-API-KEY` to `https://<host>/api/v1`. A `localhost` or `127.0.0.1` host is
reached over `http://`, since a local n8n has no certificate; any other host needs HTTPS. The instance must have the
public API enabled.
The key's scopes (enterprise plans) or its user's role decide what the AI can do, and licensed features (source control,
SSO, LDAP, log streaming, promotions, policies) answer 403 on instances without them. Deprecated operations
(`activateWorkflow`, `deactivateWorkflow`) are left out; publish and unpublish a workflow instead.

Cloudflare reads an API token (Cloudflare dashboard → My Profile → API Tokens, user or account token) in
`CLOUDFLARE_API_TOKEN` and sends it as a bearer token to `https://mcp.cloudflare.com/mcp`. The token decides what the AI
can do: `api:requests:execute` runs any call it allows, so grant only the permissions you want, and give an account
token Account Resources: Read so the server finds the account id. Tokens with Client IP Address Filtering are not
supported.

Postman reads an API key (Postman → Settings → API keys, `PMAK-…`) in `POSTMAN_API_KEY` and sends it as a bearer token to
`https://mcp.postman.com/mcp`, the Full mode of Postman's server; the key decides what the AI can see and change. The EU
region (`mcp.eu.postman.com`) and Postman's OAuth sign-in are not used. A tool Postman adds later stays `tools:<name>`
until `servers/postman/const.ts` names it, and the server then opens as one flat list.

Medium reads an integration token (medium.com → Settings → Security and apps → Integration tokens) in
`MEDIUM_INTEGRATION_TOKEN` and sends it as a bearer token to `https://api.medium.com/v1`. Medium has archived this API and
no longer issues new tokens, so the server works only for people who already have one. It can only create posts (arguments are named as in Medium's docs, for example `contentFormat` and `publishStatus`; publish as `draft`
to keep one private), list publications and upload images; there is no tool to read, edit or delete a post.

Teams signs in as a Microsoft Entra application (a bot), not as you, and posts into one channel. It needs `git` and `uv`
on PATH (uv installs its own Python 3.12 for it, never the system one). The first call opens the same credentials
window as the other servers, with a field and a hint for each of `TEAMS_APP_ID`, `TEAMS_APP_PASSWORD`,
`TEAMS_APP_TENANT_ID`, `TEAM_ID` and `TEAMS_CHANNEL_ID` and links to your Entra app registrations and the server's
[setup guide](https://github.com/InditexTech/mcp-teams-server/blob/main/doc/MS-Teams-setup.md); the values are saved
once the server has started with them. Setting them in the client's env for usemcpkit skips the window.
Microsoft's own Teams MCP server (Work IQ) is not used: it needs a signed-in Entra OAuth token that usemcpkit cannot get.

## Manifest format

```jsonc
{
  "name": "github",                       // [a-z][a-z0-9_]*
  "category": "git",                      // [a-z][a-z0-9-]*, groups servers of one kind
  "version": "1.0.0",
  "baseUrl": "https://{domain}",          // https only; {domain} is optional, see Domain
  "domain": { "label": "GitHub API host", "default": "api.github.com", "env": "GITHUB_API_HOST" },
  "headers": { "Accept": "application/vnd.github+json" },
  "auth": [                               // tried top to bottom, see Auth
    { "type": "bearer", "env": "GITHUB_TOKEN" }
  ],
  "tools": [
    {
      "name": "list_issues",
      "description": "List issues in a repository.",
      "input": { "type": "object", "properties": { ... }, "required": ["owner", "repo"] },
      "request": {
        "method": "GET",
        "path": "/repos/{owner}/{repo}/issues",  // {arg} → URL-encoded argument
        "query": ["state", "per_page"],          // or { "q": "query" } to rename
        "body": ["title"],                       // JSON body for non-GET, see Request bodies
        "commaQuery": ["tags"],                  // optional: array query keys joined with commas (others repeat the key)
        "fileArgs": ["file"],                    // optional: args holding a local file path; sent as multipart parts (contentType multipart/form-data) or as the raw bodyArg
        "saveToArg": "save_to",                  // optional: arg holding a local path; a successful response is written there and a summary returned
        "fixedQuery": { "sort": "updated" },     // optional: constant query values
        "contentType": "text/plain",             // optional: default application/json; text/* sends bodyArg as plain text
        "fixedHeaders": { "X-Atlassian-Token": "no-check" }, // optional: constant request headers
        "fixedBody": { "type": "issue" },        // optional: constant body values, args win
        "bodyArg": "body"                        // optional: send this arg as the whole JSON body (array, string or free-form object); excludes body/fixedBody
      },
      "response": {
        "root": "items",                         // optional: dig into the payload
        "fields": { "author": "user.login", "labels": "labels[].name" }
      }
    }
  ]
}
```

**Request bodies.** Outgoing body keys may be dotted paths that build nested JSON, with numbers as array
indexes: `{ "fields.project.key": "project_key", "ancestors.0.id": "parent_id" }` sends
`{"fields":{"project":{"key":"..."}},"ancestors":[{"id":"..."}]}`. `fixedBody` keys work the same way. Fixed values
are strings, numbers or booleans.

**Editions.** One server can cover deployments whose endpoints differ, such as Atlassian Cloud and Data Center. The
manifest names them with the host suffixes that select them; a tool overrides its `request` (and `response`, when
given) per edition. A domain matching no edition uses the tool's own request:

```jsonc
"editions": { "cloud": { "label": "Cloud", "hosts": [".atlassian.net"] } },   // names: [a-z][a-z0-9-]*
"tools": [
  {
    "name": "search_issues",
    "request": { "method": "GET", "path": "/rest/api/2/search", "query": ["jql"] },
    "editions": {
      "cloud": { "request": { "method": "GET", "path": "/rest/api/2/search/jql", "query": ["jql"] } }
    }
  }
]
```

The edition follows the domain in use, including one typed in the credentials form.

## Auth

`auth` lists OAuth2 entries (`oauth`) first, then fallbacks. A server can use fallbacks only:

```jsonc
"auth": [
  { "type": "oauth", "authorizationUrl": "...", "tokenUrl": "...", "clientId": "..." },   // optional
  { "type": "bearer", "env": "GITHUB_TOKEN" }                                            // fallback
]
```

Every tool call tries, in this order, and uses the first that works:

1. the server's OAuth2 token in `tokens.json`, refreshed if it expired (only when `auth` has `oauth` entries);
2. each fallback whose value is set, top to bottom. A value comes from its env var, or else from `config.json`;
3. the **credentials form**: a local page opened in the browser that asks for the missing values (and the domain,
   see below), or offers "Sign in with OAuth2" when the server has `oauth` entries.

An option is skipped when its credentials are missing or the API answers `401`. A fallback that worked is tried right after `tokens.json` on later calls in the same process. If nothing works, the call fails with one line per option
saying why. `none` can only be the last entry. Leaving out `auth` means no auth.

**Fallbacks.** The manifest never holds a secret, only where to find it:
`none`, `bearer {env}`, `header {env, name, prefix?}`, `query {env, name}`, `basic {usernameEnv, passwordEnv}`
(each also takes an optional `label`, the option's title in the form; all but `none` take an optional
`ui`, see below).
Env vars always win, so CI keeps working without a browser.

**Credentials form.** `usemcpkit serve` starts a one-off server on `127.0.0.1` (a free port), prints its URL to
stderr and opens the browser. Only the page that was opened can answer: the URL carries a session token in its
`#fragment` and the server checks it and the `Host` header. Concurrent calls share one form; it closes after
an answer, on Cancel, or after 5 minutes. Secrets are saved **only after the API accepts them**, so a typo is never
stored.

**Config file.** The hosts and the saved credentials live together in `~/.usemcpkit/config.json`, by category, server and host
(`{ "servers": { "git": { "gitlab": { "hosts": { "git.acme.com": { "secrets": { "GITLAB_TOKEN": "glpat-…" } } }, "projects": { "/work/app": "git.acme.com" } } } } }`),
which you can edit by hand. Credentials never cross hosts. With several hosts for one server, the host of a call is, in order:
its env var; the host its project (git root) was bound to the first time you answered the form; the saved host the
project's `origin` remote points at (servers whose manifest sets `domain.matchGitRemote`, such as GitHub and GitLab);
otherwise the form asks, and the answer is remembered for that project. Credentials are plain text, with file mode `0600` in a `0700` directory, the way `gh` and `glab` keep
their tokens. The file carries a `version` (now 2); a file without one is version 1 and, like an older `secrets.json`, is upgraded on first use by the migration list in `crates/auth/src/config/config_migrations.rs` (a new version is one appended entry), and a file from a newer usemcpkit is refused rather than overwritten. There is no password and nothing to unlock. Any program running as your user can read the file, so
protect your account and disk; to forget a credential, delete its entry or the file. Environment variables always win
over the file.

**Form UI.** The page holds no text of its own. The CLI injects the whole view model, built from the manifest, into
the page as JSON, and the page only renders it. Wording and buttons come from the manifest through `defineUI`:

```ts
import { defineServer, defineUI } from '@usemcpkit/core';

defineServer({
  // ...
  ui: defineUI({ texts: { title: 'Connect {server}', submit: 'Save' } }), // any key of the default texts
  auth: [
    {
      type: 'bearer',
      env: 'GITHUB_TOKEN',
      ui: defineUI({
        inputs: { GITHUB_TOKEN: { label: 'Token', hint: '…', placeholder: 'ghp_…' } },
        actions: [
          { type: 'link', label: 'Create on GitHub ↗', url: 'https://{webHost}/settings/tokens/new?name=usemcpkit+{server}' },
          { type: 'cli', label: 'Use GitHub CLI', command: 'gh', args: ['auth', 'token', '--hostname', '{webHost}'] },
        ],
      }),
    },
  ],
});
```

- `texts` (on the manifest) overrides the defaults in core (`DEFAULT_UI_TEXTS`); `{server}` is filled in. `domain`
  also takes `hint` and `placeholder`.
- `inputs` (on an auth entry, keyed by env var name) sets a field's `label`, `hint` and `placeholder`.
- A `link` action opens an `https://` URL. `{domain}` is the typed domain, `{webHost}` its web host
  (`api.github.com` → `github.com`, `api.<name>.ghe.com` → `<name>.ghe.com`, `<host>/api/v3` → `<host>`), `{server}`
  the server name. The link follows the domain field and stays hidden while it needs a domain and there is none.
- A `cli` action carries its own `command` and `args`; core has no list of tools. `command` must be a program name
  found on PATH (no path, no arguments), and `args` may use `{domain}` and `{webHost}`. On click the CLI process, not
  the page, runs it without a shell, with a 15 s timeout; the token it prints goes straight to the API check and never
  reaches the browser. It is offered only for an entry with a single credential, and only when the program is on PATH
  when the form opens. Nothing runs without the click.

GitLab offers **Use GitLab CLI**, which runs `glab config get token --host <host>`. **Create on GitLab ↗** opens the personal access token page of the server's
host (`<host>/-/user_settings/personal_access_tokens`, under the relative URL root if the domain has one), prefilled
with a name and the `api` scope.

The CLI button is offered only for options with a single field. A domain typed in the form is used once it is valid. An imported token is saved like a
typed one: only after the API accepts it. Manifests can be updated remotely (see below), so only use a registry you
trust: its `cli` buttons name the programs usemcpkit runs when you click them.

**Domain.** A server whose host differs per user (GitHub Enterprise, self-hosted GitLab, Jira...) writes
`{domain}` in `baseUrl` and, if it has them, in the OAuth URLs, and declares `domain`:

```jsonc
"domain": { "label": "GitHub API host", "default": "api.github.com", "env": "GITHUB_API_HOST" }   // all optional
```

The domain comes from the env var, else `config.json`, else `default`. The form shows it prefilled and lets the
user change it (`host[:port][/path]`, no scheme), unless the env var is set.
`suggestedHosts` lists hosts the field offers after the saved ones (n8n offers `app.n8n.cloud` and `localhost:5678`);
offering one does not pick it. With `loopbackHttp: true`, a `localhost` or `127.0.0.1` domain is reached over
`http://` in `baseUrl`, the upstream and OAuth URLs and `{domain}` links; every other server stays on `https://`, even on
localhost.

**OAuth 2.0 with PKCE.** The user signs in once in the browser against the provider directly:

```jsonc
{
  "type": "oauth",
  "authorizationUrl": "https://example.com/oauth/authorize",   // https only, {domain} allowed
  "tokenUrl": "https://example.com/oauth/token",               // https only, {domain} allowed
  "clientId": "public-client-id",
  "clientSecretEnv": "EXAMPLE_CLIENT_SECRET",                  // optional, for providers that need one
  "scopes": ["read", "write"],                                 // optional
  "redirectPort": 8976                                         // optional, 0 picks a free port
}
```

The sign-in starts on the first tool call that has no working token: `usemcpkit serve` prints the URL to stderr
and opens the browser. The redirect goes to `http://127.0.0.1:<port>/callback`, and the authorization code is
exchanged with a S256 code verifier. The token is saved to `~/.usemcpkit/tokens.json` (`USEMCPKIT_HOME` overrides)
with file mode `0600`, together with the entry that issued it. Tool calls send it as a Bearer token and refresh
it before it expires. Concurrent calls share one sign-in. If the MCP client gives up waiting, the sign-in still
finishes and the next call uses the token.

## Server manifests

No manifest ships inside the binary. They live in a registry (by default the repository's GitHub Pages, published by
`.github/workflows/release-registry.yml`, a job of the Release workflow that deploys the manifests the Release build already produced; the build restores the Nx cache, so only changed projects are built):

```
index.json                  every server: id, version, description, link, sha256 (no tools, so it stays small)
<category>/<server>.json    one manifest, for example git/gitlab.json
<category>/<server>/<group>.json  with grouped tool names (git/github.json is a shell listing git/github/<group>.json)
```

Only `index.json` is synced by default (into `~/.usemcpkit/manifests`, `USEMCPKIT_HOME` overrides). A manifest is downloaded
the first time a tool of that server is described or called, checked against the `sha256` in the index, and cached.

- `usemcpkit install` and the first `serve`/`list` with nothing cached download the index.
- The cache is always served, and opening a server or calling a tool never asks the registry for changes.
  `~/.usemcpkit/manifests/cache.json` maps each cached file (`index.json`, `git/github.json`,
  `git/github/issues.json`, ...) to `updatedAt` (ms, when its content last changed), `checkedAt` (ms, when it was
  last confirmed current) and its `sha256`. Only a download that fails its checksum, because the cached index is
  older than the registry, fetches the index again once.
- `usemcpkit update [--registry <url>]` refreshes the index and re-downloads the manifests and parts that are already
  cached and no longer match it, so an edit published without a version bump still lands. A server or part nobody
  opened is never downloaded. The URL comes from the flag, `USEMCPKIT_REGISTRY`, then the default.
- `usemcpkit upgrade` runs that update and then replaces the installed binary. It is what the scheduled job runs every
  six hours, so manifests and binary stay current without anyone running a command. `USEMCPKIT_AUTO_UPDATE=0` turns the
  scheduled job and the binary auto-update off.
- Self-hosting a registry is hosting the `packages/servers/build/manifests/` folder (links in `index.json` are built from the
  registry URL in `packages/servers/vite.config.ts`; the binaries read `DEFAULT_REGISTRY_URL` in `crates/registry`).

### What the AI client sees

The tool list starts as one **section** per served server (`git_github`, `git_gitlab`, ...). A section is not a tool: its
description says so, it takes no arguments, and calling it opens it. A server split into groups answers with its groups,
each one another section (`git_github_issues`); calling a group, or a server that has no groups, puts its tools into the
list and usemcpkit sends `tools/list_changed`. Only what the model opens is downloaded: the index first, then the server's
shell, then the one group file. Every real tool is its own MCP tool, with its description and input schema, so the
client's permission rules apply per tool: `git:github` with `issues:issues:get_issue` is `git_github_issues_get_issue`
(`mcp__usemcpkit__git_github_issues_get_issue` in Claude Code). There are no `call_tool` or `describe_tool` meta-tools,
and opened sections are forgotten when the server restarts. Tool names cannot contain
`:` and the API caps a name at 64 characters, 13 of which the client spends on `mcp__usemcpkit__`, so a name longer than 51
characters is cut at a word boundary and ends in a 6-character hash of its full id (`..._comments_create_d9463b`). The
hash depends only on the id, so a name and the permission rule written for it stay the same from run to run.

Opening a section downloads its file once (cached under `~/.usemcpkit/manifests`). A section that cannot be opened stays
closed and the call returns an error saying why. Reads are marked
read-only, deletes destructive and known writes as writes; any other verb is left unannotated.

Ids still come from `index.json`: `<category>:<server>:<resource>:<action>` selects `<category>/<server>.json`.
`usemcpkit serve [servers…]` limits the catalog to the given ids or bare names.

### Debugging a connection

When a client shows the sections but never the tools a section opens, or a connection drops, turn on the wire log:
set `USEMCPKIT_DEBUG=1` in the environment the client starts usemcpkit with (the server entry's `env`, or the user
environment, then quit and reopen the client so its processes see it). Every `serve` process then appends one JSON line
per message and lifecycle event to its own file under `~/.usemcpkit/logs`, named `<role>-<start time>-<pid>.jsonl`. A
compiled binary writes two: the `supervisor` that owns the client's stdio and the `server` worker it runs. Each line
records the time, the process and its parent (`pid`, `ppid`), the event and the message's `id`, `method`, called
`tool`, the client's name from `initialize`, its error and its size. It never records arguments, results, credentials
or environment values, so a log can be shared as it is. It can stay on: every start adds new files, so clear old ones
from time to time, and unset the variable to stop writing them.
