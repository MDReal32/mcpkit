# @usemcpkit/core

Library behind mcpkit: the manifest format and its validation, the server SDK (`defineServer`, `defineTool`,
`defineUI`), the HTTP executor with response mapping, and auth (fallbacks, OAuth 2.0 PKCE, the credentials form
contract). Published to npm. It contains no per-provider code: a server differs from another only in its manifest.

Public surface: `src/main.ts` (built to `build/mcpkit.core.js` with bundled types in `build/mcpkit.core.d.ts`).

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

**Credentials form.** `mcpkit serve` starts a one-off server on `127.0.0.1` (a free port), prints its URL to
stderr and opens the browser. Only the page that was opened can answer: the URL carries a session token in its
`#fragment` and the server checks it and the `Host` header. Concurrent calls share one form; it closes after
an answer, on Cancel, or after 5 minutes. Secrets are saved **only after the API accepts them**, so a typo is never
stored.

**Config file.** The hosts and the saved credentials live together in `~/.mcpkit/config.json`, by server and host
(`{ "servers": { "gitlab": { "domain": "git.acme.com", "hosts": { "git.acme.com": { "secrets": { "GITLAB_TOKEN": "glpat-…" } } }, "projects": { "/work/app": "git.acme.com" } } } }`),
which you can edit by hand. Credentials never cross hosts. With several hosts for one server, the host of a call is, in order:
its env var; the host its project (git root) was bound to the first time you answered the form; the saved host the
project's `origin` remote points at (servers whose manifest sets `domain.matchGitRemote`, such as GitHub and GitLab);
otherwise the form asks, and the answer is remembered for that project. Credentials are plain text, with file mode `0600` in a `0700` directory, the way `gh` and `glab` keep
their tokens. The file carries a `version` (now 2); a file without one is version 1 and, like an older `secrets.json`, is upgraded on first use, and a file from a newer mcpkit is refused rather than overwritten. There is no password and nothing to unlock. Any program running as your user can read the file, so
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
