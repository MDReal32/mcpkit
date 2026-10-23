# mcpkit

Many MCP servers in one binary. Each server is a **JSON manifest** that describes its
API, auth, tools and response mapping. A generic executor runs those manifests.

## Repository layout

```
packages/core      @usemcpkit/core      library: manifest format, SDK, executor, auth (publishable)
packages/ui        @usemcpkit/ui        Svelte pages the CLI opens in the browser, e.g. the credentials form (private)
packages/testing   @usemcpkit/testing   shared test fixtures (private)
apps/cli           @usemcpkit/cli       mcpkit CLI + MCP stdio server, server definitions, binaries
apps/npx           usemcpkit         wrapper so `npx usemcpkit` runs @usemcpkit/cli
```

Yarn 4 workspaces and Nx, Node 22.18+. Every command below runs from the repository root.

```bash
yarn install
yarn build          # every package; apps/cli/build/mcpkit.cli.js + packages/servers/build/manifests/
yarn test
yarn typecheck
yarn lint           # Biome: lint + format + import order check per project
yarn format         # Biome: apply formatting and safe fixes across the repo
yarn package        # + binaries in apps/cli/build/bin and npm packages in apps/cli/build/npm (needs bun)
MCPKIT_TARGETS=darwin-arm64,linux-x64 yarn package   # only some targets
```

Every package builds from `src/main.ts` into `build/mcpkit.<package>.js` (`mcpkit.core.d.ts` for the published types,
`mcpkit.ui.html` for the UI page). Nx runs `lint`, `typecheck` and `test` before every `build`, and builds dependencies first.

## Install

```bash
npx usemcpkit
```

This finds the AI clients installed for the current user, asks which ones to set up, copies the mcpkit binary for
this OS to `~/.mcpkit/bin/mcpkit` and adds one `mcpkit` entry (`<binary> serve`, every server) to each chosen client.
Running it again updates the entries in place. Only the `mcpkit` key is touched: comments and other keys stay, and the
previous file is kept as `<config>.mcpkit-backup`. Restart the clients afterwards (later updates reload live).

```bash
npx usemcpkit --all                         # every detected client, no checklist (needed without a terminal)
npx usemcpkit --clients cursor,codex        # only these
mcpkit install --binary ./mcpkit         # install a local binary instead of downloading one
mcpkit uninstall [--all | --clients ...] # remove the entry; the binary stays
mcpkit upgrade                           # update the installed binary now
```

Supported clients (ids): `claude-desktop`, `claude-code` (`~/.claude.json`), `cursor`, `vscode`, `vscode-insiders`
(`servers` in the user `mcp.json`), `devin-desktop` (Windsurf's new home), `windsurf` (legacy `~/.codeium/windsurf`),
`cline` (`~/.cline`), `roo-code`, `copilot-cli`, `codex` (TOML), `gemini-cli`, `zed` (`context_servers`), `opencode`
(`mcp`), `kiro`, `lm-studio`, `junie`, `warp`. A client counts as installed when its config directory exists. Each
client's path and entry shape lives in `packages/clients/src/definitions/<id>.ts`.

**Where the binary comes from.** When the CLI runs as the compiled binary it copies itself. Under Node (`npx`) it
downloads `@usemcpkit/cli-<target>` (for example `@usemcpkit/cli-darwin-arm64`, `@usemcpkit/cli-linux-x64-musl`) at the same
version from the npm registry and checks the tarball against its published `sha512` integrity. `yarn package`
writes those packages to `apps/cli/build/npm/cli-<target>/`; publish each of them together with `@usemcpkit/cli` and
`mcpkit`.

**Auto-update.** `mcpkit serve`, when it is the installed binary, checks the npm registry at most once a day
(`~/.mcpkit/update-state.json`) in the background. A newer release replaces the binary and is picked up without
restarting the client, see Live reload. `MCPKIT_AUTO_UPDATE=0` turns this off, `MCPKIT_NPM_REGISTRY` points at another
registry.

**Live reload.** A compiled `mcpkit serve` is a small supervisor: it keeps the client's stdio connection and runs the
real server as a worker (`mcpkit serve --worker`). It polls its own binary file and, once the file was replaced and
stayed the same for two polls (3 s each), starts the new binary as a second worker, replays the client's `initialize`
handshake to it and only then switches new requests over. The old worker finishes the requests it already has (up to
5 minutes) and exits. The client is told with `notifications/tools/list_changed`, which the server advertises as
`tools.listChanged`, so new and changed tools show up without a restart. The same applies when you copy a rebuilt
binary over `~/.mcpkit/bin/mcpkit` or when auto-update downloads a release. If the new binary fails to answer
`initialize` within 15 s, the running server stays and the reason is logged to stderr. The supervisor itself is not
swapped: a release that changes it needs one client restart. Clients that ignore `list_changed` need a restart to see
changed tool lists; calls always run on the new server. A Homebrew upgrade moves the binary to a new `Cellar/<version>`
folder, so that install is not reloaded live.

**Homebrew and winget.** The package only installs the binary. Running `mcpkit` afterwards shows the same client
checklist. A binary under Homebrew's `Cellar/mcpkit/<version>` is used in place: clients get `<prefix>/bin/mcpkit`,
the link Homebrew moves on every upgrade. A winget binary under `WinGet\Packages\<id>_…` is also used in place. Neither
is copied to `~/.mcpkit/bin` or updated by mcpkit; `mcpkit upgrade` prints the `brew upgrade` / `winget upgrade`
command instead. The Homebrew formula's `caveats` and the winget manifest's `InstallationNotes` should say "Run
`mcpkit` to set up your AI clients."

## CLI

```
packages/servers/src/servers/gitlab/gitlab.ts   author servers in TypeScript (one folder per server, one tool per file)
  └─ vite build                          packages/servers: plugins/manifests/ compiles + validates src/servers/*, then:
       ├─ build/mcpkit.cli.js             the CLI, no manifests inside
       └─ build/manifests/*.json          compiled manifests + index.json (the registry; CI publishes it to GitHub Pages)
            └─ yarn package              plugins/binaries/ runs bun compile → build/bin/mcpkit-<os>-<arch>
```

An invalid server definition fails the build. The build log lists each compiled manifest:

```
mcpkit: 1 manifest(s) → build/manifests
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
      "command": "/Users/me/.mcpkit/bin/mcpkit",
      "args": ["serve"]
    }
  }
}
```

`mcpkit serve` with no names serves every server; `mcpkit serve github` only some. Tools are named `<server>_<tool>`.

### Bundled servers

| Server | Category | Hosts | Tools |
| --- | --- | --- | --- |
| `github` | `git` | github.com, GitHub Enterprise Server, GHE.com | the whole GitHub REST API (1,239 operations), tools named after its operation ids, for example `pulls:list`, `issues:create`, `repos:get_content`; generated by `yarn workspace @usemcpkit/servers generate:github` |
| `gitlab` | `git` | gitlab.com, self-managed GitLab (`<host>[/<relative url root>]`) | the GitLab REST API (1,648 operations), tools named `<group>:<resource>:<action>` after the API tag and path, for example `projects:projects:list_projects_issues`, `issues:notes:create_projects_merge_requests_notes`; generated by `yarn workspace @usemcpkit/servers generate:gitlab` |
| `jira` | `atlassian` | Jira Cloud (`<site>.atlassian.net`), Jira Data Center | the Jira platform REST API (`/rest/api/2`, 625 tools with Jira Software boards and sprints under `software:`), named `<group>:<resource>:<action>`, for example `issues:issues:create_issue`, `issues:issue_search:search_and_reconsile_issues_using_jql` (picks the Cloud or Data Center endpoint), `software:board:get_all_boards`; generated by `yarn workspace @usemcpkit/servers generate:jira` |
| `confluence` | `atlassian` | Confluence Cloud (`<site>.atlassian.net`), Confluence Data Center | the Confluence REST APIs (529 operations) in three groups: `cloud` (Cloud REST v2, for example `cloud:pages:create_page`), `cloud_v1` (Cloud REST v1, `cloud_v1:search:search_by_cql`) and `datacenter` (Data Center 10.2 REST, `datacenter:content:create`); generated by `yarn workspace @usemcpkit/servers generate:confluence` |

GitLab reads `GITLAB_HOST` (default `gitlab.com`) and a personal access token in `GITLAB_TOKEN`. Tools take a project
id or its full path (`group/subgroup/project`) as `id`, and issue and merge request numbers are the per-project `iid`.

Jira and Confluence ask for the host first (`JIRA_HOST` / `CONFLUENCE_HOST`, for example `acme.atlassian.net` or
`jira.example.com/jira`), then for one of two options: **Cloud: email + API token** (`JIRA_USERNAME` +
`JIRA_API_TOKEN`, `CONFLUENCE_USERNAME` + `CONFLUENCE_API_TOKEN`) or **Data Center: personal access token**
(`JIRA_PERSONAL_TOKEN`, `CONFLUENCE_PERSONAL_TOKEN`). Cloud and Data Center use different endpoints where Atlassian
removed the old ones on Cloud (Jira issue search); the host picks them, see Editions. Confluence names the deployment in the tool group instead: call `cloud` or `cloud_v1` tools on a `*.atlassian.net` host and `datacenter` tools on Data Center.
On Cloud, `search_issues` returns the first `max_results` issues only (`start_at` is Data Center only), and
Confluence Cloud v2 tools take a space id (`cloud:spaces:get_spaces`) instead of a space key.

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
        "fixedQuery": { "sort": "updated" },     // optional: constant query values
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
2. each fallback whose value is set, top to bottom. A value comes from its env var, or else from `secrets.json`;
3. the **credentials form**: a local page opened in the browser that asks for the missing values (and the domain,
   see below), or offers "Sign in with OAuth2" when the server has `oauth` entries.

An option is skipped when its credentials are missing or the API answers `401`. A fallback that worked is tried right after `tokens.json` on later calls in the same process. If nothing works, the call fails with one line per option
saying why. `none` can only be the last entry. Leaving out `auth` means no auth.

**Fallbacks.** The manifest never holds a secret, only where to find it:
`none`, `bearer {env}`, `header {env, name, prefix?}`, `query {env, name}`, `basic {usernameEnv, passwordEnv}`
(each also takes an optional `label`, the option's title in the form; all but `none` take an optional
`ui`, see below).
Env vars always win, so CI keeps working without a browser.

**Credentials form.** `mcpkit serve` starts a one-off server on `127.0.0.1` (a free port), prints its URL to
stderr and opens the browser. Only the page that was opened can answer: the URL carries a session token in its
`#fragment` and the server checks it and the `Host` header. Concurrent calls share one form; it closes after
an answer, on Cancel, or after 5 minutes. Secrets are saved **only after the API accepts them**, so a typo is never
stored. The domain is not a secret: it is saved to `~/.mcpkit/config.json`
(`{ "servers": { "gitlab": { "domain": "git.acme.com" } } }`), which you can edit by hand.

**Secrets file.** Saved credentials are plain text in `~/.mcpkit/secrets.json`, by server and key
(`{ "github": { "GITHUB_TOKEN": "ghp_…" } }`), with file mode `0600` in a `0700` directory, the way `gh` and `glab` keep
their tokens. There is no password and nothing to unlock. Any program running as your user can read the file, so
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
          { type: 'link', label: 'Create on GitHub ↗', url: 'https://{webHost}/settings/tokens/new?name=mcpkit+{server}' },
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
trust: its `cli` buttons name the programs mcpkit runs when you click them.

**Domain.** A server whose host differs per user (GitHub Enterprise, self-hosted GitLab, Jira...) writes
`{domain}` in `baseUrl` and, if it has them, in the OAuth URLs, and declares `domain`:

```jsonc
"domain": { "label": "GitHub API host", "default": "api.github.com", "env": "GITHUB_API_HOST" }   // all optional
```

The domain comes from the env var, else `config.json`, else `default`. The form shows it prefilled and lets the
user change it (`host[:port][/path]`, no scheme), unless the env var is set.

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

The sign-in starts on the first tool call that has no working token: `mcpkit serve` prints the URL to stderr
and opens the browser. The redirect goes to `http://127.0.0.1:<port>/callback`, and the authorization code is
exchanged with a S256 code verifier. The token is saved to `~/.mcpkit/tokens.json` (`MCPKIT_HOME` overrides)
with file mode `0600`, together with the entry that issued it. Tool calls send it as a Bearer token and refresh
it before it expires. Concurrent calls share one sign-in. If the MCP client gives up waiting, the sign-in still
finishes and the next call uses the token.

## Server manifests

No manifest ships inside the binary. They live in a registry (by default the repository's GitHub Pages, published by
`.github/workflows/registry.yml` whenever `packages/servers/src` or the manifest compiler changes):

```
index.json                  every server: id, version, description, tool names, link, sha256
<category>/<server>.json    one manifest, for example git/gitlab.json
<category>/<server>/<group>.json  with grouped tool names (git/github.json is a shell listing git/github/<group>.json)
```

Only `index.json` is synced by default (into `~/.mcpkit/manifests`, `MCPKIT_HOME` overrides). A manifest is downloaded
the first time a tool of that server is described or called, checked against the `sha256` in the index, and cached.

- `mcpkit install` and the first `serve`/`list` with nothing cached download the index.
- After that `serve` checks once a day in the background (`~/.mcpkit/manifests/.synced`); the result applies at the
  next start. `MCPKIT_AUTO_UPDATE=0` turns the background check off.
- `mcpkit update [--registry <url>]` syncs now: it refreshes the index and re-downloads cached manifests whose
  checksum changed, so an edit published without a version bump still lands. The URL comes from the flag,
  `MCPKIT_REGISTRY`, then the default.
- Self-hosting a registry is hosting the `packages/servers/build/manifests/` folder (links in `index.json` are built from the
  registry URL in `apps/cli/vite.config.ts`).

### What the AI client sees

Tool names cannot contain `:`, so the server exposes four fixed tools and the tool id is an argument:

| Tool            | Arguments              | Returns                                                         |
| --------------- | ---------------------- | --------------------------------------------------------------- |
| `list_servers`  | none                   | server ids, for example `["git:github", "git:gitlab"]`          |
| `list_tools`    | `server`               | tool ids, for example `["git:github:issues:pulls:list"]`        |
| `describe_tool` | `id`                   | description and input schema (loads the manifest)               |
| `call_tool`     | `id`, `arguments`      | the tool result (loads the manifest)                            |

Ids come straight from `index.json`; `<category>:<server>:<resource>:<action>` selects `<category>/<server>.json`, for example `git:github:issues:pulls:list`.
`mcpkit serve [servers…]` limits the catalog to the given ids or bare names.
