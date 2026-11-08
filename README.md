# usemcpkit

Many MCP servers in one binary. Each server is a **JSON manifest** that describes its
API, auth, tools and response mapping. A generic executor runs those manifests.

## Repository layout

```
packages/core      @usemcpkit/core       library: manifest format, SDK, form contract (publishable)
packages/servers   @usemcpkit/servers    server definitions and generators, compiled into the registry (private)
packages/testing   @usemcpkit/testing    shared test fixtures (private)
apps/runner        usemcpkit-runner      the usemcpkit binary: commands, installing, the supervisor (Rust)
apps/server        usemcpkit-servers     the usemcpkit-servers binary: MCP stdio server; embeds and launches the credentials window (Rust)
apps/window        usemcpkit-window      the credentials window: a Tauri app with the Svelte page in apps/window/ui (@usemcpkit/ui, private)
apps/npx           usemcpkit             wrapper so `npx usemcpkit` runs the binary of this platform
apps/analytics     @usemcpkit/analytics  usage-reporting Worker
apps/site          @usemcpkit/site       the landing page at mcpkit.mdreal.org (Astro, served by a Cloudflare Worker)
apps/video         @usemcpkit/video      the promo video (Remotion), shipped with the landing page
crates/*                                 the Rust libraries behind the binaries
```

Yarn 4 workspaces and Nx, Node 22.23.4+ (what Astro 7 in `apps/site` needs), and a Rust toolchain with `cargo` on PATH. Every command below runs from the
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
this OS to `~/.usemcpkit/bin/usemcpkit` and adds one `mcpkit` entry (`<binary> serve`, every server) to each chosen client.
Running it again updates the entries in place, and replaces a `usemcpkit` entry 0.10 or 0.11 wrote. Only that key is
touched: comments and other keys stay, and the previous file is kept as `<config>.usemcpkit-backup`. For Claude Code it
also sets `"agentPushNotifEnabled": true` in `~/.claude/settings.json`, the same way. Restart the clients afterwards
(later updates reload live).

The client sees two tools, `search` and `execute`, whatever the servers (see "What the AI client sees").
Install then asks whether usemcpkit keeps itself **up to date** (on by default) and writes `USEMCPKIT_AUTOUPDATE=1` or `0` the
same way; `--auto-update` (or `--auto-update=false`) answers it without asking, and `--all` and `--clients` leave it on.
Running install again rewrites the whole entry, so set any other variable of yours there again afterwards.

```bash
npx usemcpkit --all                         # every detected client, no checklist (needed without a terminal)
npx usemcpkit --clients cursor,codex        # only these
usemcpkit install --binary ./usemcpkit         # install a local binary instead of downloading one
usemcpkit install --all --auto-update=false    # every client, no scheduled upgrade and no self-update
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
restarting the client, see Live reload. `USEMCPKIT_AUTOUPDATE=0` turns this off and unloads the scheduled
`usemcpkit upgrade` (the next `serve` removes it), `1` or unset loads it again; `USEMCPKIT_NPM_REGISTRY` points at another
registry.

**Live reload.** A compiled `usemcpkit serve` is a small supervisor: it keeps the client's stdio connection and runs the
real server as a worker (`usemcpkit serve --worker`). It polls its own binary file and, once the file was replaced and
stayed the same for two polls (3 s each), starts the new binary as a second worker, replays the client's `initialize`
handshake to it and only then switches new requests over. The old worker finishes the requests it already has (up to
5 minutes) and exits. The client is told with `notifications/tools/list_changed`, which the server advertises as
`tools.listChanged`, so a changed server list in the description of `search` shows up without a restart. The same applies when you copy a rebuilt
binary over `~/.usemcpkit/bin/usemcpkit` or when auto-update downloads a release. If the new binary fails to answer
`initialize` within 15 s, the running server stays and the reason is logged to stderr. The supervisor itself is not
swapped: a release that changes it needs one client restart. Clients that ignore `list_changed` need a restart to see
a changed server list; calls always run on the new server. A Homebrew upgrade moves the binary to a new `Cellar/<version>`
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
cargo build --release -p usemcpkit-window  apps/window: the Tauri credentials window, with its Svelte page inside
cargo build --release                    apps/runner + apps/server (embeds the window), no manifests inside
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
    "mcpkit": {
      "command": "/Users/me/.usemcpkit/bin/usemcpkit",
      "args": ["serve"]
    }
  }
}
```

`usemcpkit serve` with no names serves every server; `usemcpkit serve github` only some. The client sees `search` and
`execute`, which find and call the tools of those servers.

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
| `n8n_mcp` | `automation` | n8n Cloud, self-hosted n8n 1.120.0 or later (`<host>[/<path>]`), with MCP access turned on | n8n's own instance-level MCP server (`https://<host>/mcp-server/http`), reached as an HTTP upstream with one-click OAuth and opened by group: `workflows` (search, run, test, build, publish, history), `executions`, `builder` (node search, SDK reference, validation), `data_tables`, `projects`, `credentials`, `agents`, `skills`, `instance` and `preferences`, for example `workflows:workflows:search`, `workflows:workflows:execute`, `data_tables:rows:add`; see `servers/n8n-mcp` |
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

n8n's REST API takes only an API key, so the one-click sign-in goes through the separate `n8n_mcp` server, n8n's own
instance-level MCP server. It asks for the same host (`N8N_HOST`, the same suggestions, `http://` for `localhost`), then
offers "Sign in with OAuth2": usemcpkit finds n8n's sign-in from the server's OAuth metadata, registers itself with the
instance (see "OAuth for MCP servers" below), and you approve the permissions in n8n's consent screen. An instance
admin must first turn on MCP access (Settings → Instance-level MCP → Enable MCP access); the sign-in needs n8n 1.120.0
or later. Without OAuth it reads an MCP access token (Settings → Instance-level MCP → Connect → API key tab) in
`N8N_MCP_TOKEN`, sent as a bearer token; the REST API key does not work there. If an admin limited OAuth to trusted
callback URLs (Allowed callback URLs → Only trusted URLs), add `http://127.0.0.1/callback`: n8n matches a loopback
callback on any port. Clients only reach workflows enabled for MCP, apart from `workflows:workflows:search`, which
previews every workflow the user can see. Which tools exist depends on the instance's version, license and settings
(the workflow builder, agents, skills, folders) and on the permissions granted at sign-in. Tools older instances
serve under earlier names (`get_execution`, `list_tags`, …) get the same names, and a tool n8n adds later stays
`tools:<name>` until `servers/n8n-mcp/const.ts` names it.

Cloudflare signs in with one click: the first call opens the credentials window, whose "Sign in with OAuth2" button runs Cloudflare's own sign-in in the browser (see "OAuth for MCP servers" below). It also reads an API token (Cloudflare dashboard → My Profile → API Tokens, user or account token) in
`CLOUDFLARE_API_TOKEN` and sends it as a bearer token to `https://mcp.cloudflare.com/mcp`. The token decides what the AI
can do: `api:requests:execute` runs any call it allows, so grant only the permissions you want, and give an account
token Account Resources: Read so the server finds the account id. Tokens with Client IP Address Filtering are not
supported.

Postman signs in with one click through its own OAuth (see "OAuth for MCP servers" below), or reads an API key (Postman → Settings → API keys, `PMAK-…`) in `POSTMAN_API_KEY` and sends it as a bearer token to
`https://mcp.postman.com/mcp`, the Full mode of Postman's server; the key decides what the AI can see and change. The EU
region (`mcp.eu.postman.com`) is not used. A tool Postman adds later stays `tools:<name>`
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
`{domain}` in `baseUrl` and, if it has them, in the OAuth URLs (`discovery` too) and an HTTP upstream's `url`, and
declares `domain`:

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

**OAuth for MCP servers (one click, no app to register).** An `oauth` entry that names only the MCP server needs no
endpoints and no client id:

```jsonc
{ "type": "oauth", "discovery": "https://mcp.example.com/mcp" }   // https only, {domain} allowed
```

On the first call without a token, usemcpkit asks the server where it signs in (the protected resource metadata of
RFC 9728 named by its `/.well-known/oauth-protected-resource`, then the authorization server's metadata of RFC 8414),
registers itself there as a public client (RFC 7591, no secret) for a loopback redirect on a free port, and runs the
same PKCE sign-in as above: one click on "Sign in with OAuth2" in the credentials window, or none when the entry is the
server's only auth, approve in the browser tab that opens, and the tab closes itself where the browser allows it. The registered client id is saved
in `~/.usemcpkit/oauth-clients.json` (0600) by issuer, and refreshes use it. A `clientId` next to `discovery` skips the
registration, for a server that does not register clients itself. `cloud:cloudflare`, `api:postman` and
`automation:n8n_mcp` carry this entry before their token fallback. The url may contain `{domain}` like `baseUrl`
(`https://{domain}/mcp-server/http` for n8n), filled with the host in use, and over `http://` for a loopback host when
the manifest sets `domain.loopbackHttp`; a token signed in on one host is not sent to another.

## Server manifests

No manifest ships inside the binary. They live in a registry (by default the repository's GitHub Pages, published by
`.github/workflows/release-registry.yml`, a job of the Release workflow that deploys the manifests the Release build already produced; the build restores the Nx cache, so only changed projects are built):

Each release reads only the manifests published with it: a binary of version `X.Y.Z` reads
`https://mdreal32.github.io/mcpkit/vX.Y.Z/`, so a binary that stays on an old version never gets manifests a newer
one changed. Every deploy publishes the registry it just built both at the root (what 0.12.0 and older read) and under
`v<version>/` of the version being released, and unpacks the `registry.tar.gz` asset of every earlier GitHub Release into
its own `v<version>/` again, since GitHub Pages replaces the whole site
(`.github/scripts/assemble-registry-site.sh`). Each folder holds:

```
index.json                  every server: id, version, description, link, sha256 (no tools, so it stays small)
<category>/<server>.json    one manifest, for example git/gitlab.json
<category>/<server>/<group>.json  with grouped tool names (git/github.json is a shell listing git/github/<group>.json)
```

Only `index.json` is synced by default (into `~/.usemcpkit/manifests`, one cache for every version, `USEMCPKIT_HOME`
overrides the home). A manifest is downloaded
the first time a tool of that server is described or called, checked against the `sha256` in the index, and cached.

- `usemcpkit install` and the first `serve`/`list` with nothing cached download the index.
- The cache is always served, and opening a server or calling a tool never asks the registry for changes.
  `~/.usemcpkit/manifests/cache.json` maps each cached file (`index.json`, `git/github.json`,
  `git/github/issues.json`, ...) to `updatedAt` (ms, when its content last changed), `checkedAt` (ms, when it was
  last confirmed current) and its `sha256`; the index entry also notes the `registry` folder it was fetched from. Only
  a download that fails its checksum, because the cached index is older than the registry, fetches the index again
  once, and an index fetched from another registry folder (another version after an upgrade, or another
  `USEMCPKIT_REGISTRY`) is synced once before it is served, and kept if that sync fails.
- `usemcpkit update [--registry <url>]` refreshes the index and re-downloads the manifests and parts that are already
  cached and no longer match it, so an edit published without a version bump still lands. A server or part nobody
  opened is never downloaded. The URL comes from the flag, `USEMCPKIT_REGISTRY` (both name the registry folder itself,
  no version is added), then the folder of this version.
- `usemcpkit upgrade` runs that update and then replaces the installed binary. It is what the scheduled job runs every
  six hours, so manifests and binary stay current without anyone running a command. `USEMCPKIT_AUTOUPDATE=0` turns the
  binary auto-update off and removes the scheduled job.
- Self-hosting a registry is hosting the `packages/servers/build/manifests/` folder and pointing `USEMCPKIT_REGISTRY` at
  it; every link in it is relative to that folder (the binaries default to `DEFAULT_REGISTRY_URL` in `crates/registry`
  plus `v<version>`).

### What the AI client sees

The client sees two tools whatever the servers, in the style of Cloudflare's Code Mode, and nothing is loaded when the
server starts:

- `search` (read-only) runs an async arrow function, such as `async () => { ... }`, that looks the tools up:
  `codemode.servers()`, `codemode.groups(server)` and `codemode.tools(server?, group?)`, which resolves to
  `{ id, description, inputSchema }` for each tool. With no server, `codemode.tools()` returns every tool at once, so
  the code can filter all of them in one pass; an upstream server is in that list once it was started, in this run or
  an earlier one whose tool list is cached, and `codemode.tools("<id>")` starts one that is not. Its description lists
  the served servers.
- `execute` runs the same kind of function with `codemode.call(id, args)` as well, which runs a tool by its full id
  (`git:github:repos:repos:list_branches`) and resolves to its result: a registry tool's JSON, or an upstream tool's
  structured content or text (parsed when it is JSON). A tool that fails throws an `Error`.

A server's shell, group files and upstream tools are loaded only when the code asks for them: each file is downloaded
once into `~/.usemcpkit/manifests`, and an upstream server (Bitwarden, Cloudflare, n8n MCP, Postman, Teams) is started only when
the code looks up or calls its tools. A server that cannot be loaded makes the code throw, with the reason, and the next
call tries again. The code runs in QuickJS (`rquickjs`), a fresh runtime per call with no network, file or module
access, 64 MB of memory and a 120-second limit that interrupts a busy loop as well as a slow tool. `console.log` lines
come back before the returned value, which is printed as JSON; an output longer than 24000 characters (about 6000
tokens) is cut and ends in `--- TRUNCATED ---`, so the code should filter and pick fields before it returns. The
client's permission rules only see `search` and `execute`, not the tools the code calls.

Ids still come from `index.json`: `<category>:<server>:<resource>:<action>` selects `<category>/<server>.json`.
`usemcpkit serve [servers…]` limits the catalog to the given ids or bare names.

### Debugging a connection

When a client does not show usemcpkit's tools, a call never returns, or a connection drops, turn on the wire log:
set `USEMCPKIT_DEBUG=1` in the environment the client starts usemcpkit with (the server entry's `env`, or the user
environment, then quit and reopen the client so its processes see it). Every `serve` process then appends one JSON line
per message and lifecycle event to its own file under `~/.usemcpkit/logs`, named `<role>-<start time>-<pid>.jsonl`. A
compiled binary writes two: the `supervisor` that owns the client's stdio and the `server` worker it runs. Each line
records the time, the process and its parent (`pid`, `ppid`), the event and the message's `id`, `method`, called
`tool`, the client's name from `initialize`, its error and its size. It never records arguments, results, credentials
or environment values, so a log can be shared as it is. It can stay on: every start adds new files, so clear old ones
from time to time, and unset the variable to stop writing them.
