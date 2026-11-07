# usemcpkit

Project rules below override any conflicting global rules (for example: no explicit
return types, no default exports, no inline `//` comments).

## Project layout

Yarn 4 workspaces + Nx (targets are inferred from each `package.json`; pipeline in `nx.json`).

- `packages/core` (`@usemcpkit/core`, publishable) — the authoring side, which runs nothing: manifest types (no validation: that is `crates/validation`, reached from Node through `@usemcpkit/native`), the SDK (`defineServer`, `defineTool`, `defineUI`), `nameUpstreamTool`, and in `credentials-form/` the credentials form contract the page shares with the Rust server (`CREDENTIALS_FORM_API`, the session header, the request element id, `FORM_WINDOW_BINDINGS`, the `Credential*` types, `resolveLinkUrl`; `test/credentials-form-contract.test.ts` checks the constants against the Rust fixture). The credentials page has no text of its own: wording, inputs and buttons come from the manifest's `ui` (`defineUI`; defaults in `manifest/ui/const.ts`), `build_credential_request` (`crates/auth`) turns it into the view model the server injects into the page, and a `cli` action carries its own `command` (a program name on PATH, no path) and `args` (with `{domain}`/`{webHost}`), which the server only fills and runs without a shell when the user clicks it. Never add per-provider code to core or the crates. Deployments with different endpoints (Atlassian Cloud vs Data Center) are manifest `editions` picked by domain host suffix, never per-server code. Public surface is `src/main.ts`; it builds to `build/usemcpkit.core.js` and `vite-plugin-dts` bundles its types into `build/usemcpkit.core.d.ts`.
- `apps/window` (`usemcpkit-window`, a Rust Tauri 2 app) and `apps/window/ui` (`@usemcpkit/ui`, private, a Yarn workspace inside it) — the credentials window. `ui` is the Svelte 5 page built into one HTML file (`build/usemcpkit.ui.html`): Tauri bundles it as the app's frontend (`tauri.conf.json` `frontendDist`, no windows of its own) and `apps/server/build.rs` embeds it too, for the browser fallback; `src/main.ts` mounts the app, which reads `window.usemcpkitWindow` (`{ api, session, request }`, core `FORM_WINDOW_CONTEXT`) when the window defines it and the injected request element and URL fragment otherwise, and calls the form API at `api` (the form server answers the app's `tauri://localhost`/`tauri.localhost` origins with CORS). The program (`src/window/`: `usemcpkit-window <url>` with the request JSON on stdin, `tauri::Builder`, the `close_window`, `fit_window` and `open_link` commands, `capabilities/form.json`, `icons/`, a transparent macOS title bar so the page gets the requested height) is embedded in `usemcpkit-servers`, which writes it to `~/.usemcpkit/window/<version>-<checksum>/` and runs it; `cargo build -p usemcpkit-window` (add `--release` for a release server) must run before the server builds, as with the UI page. The form HTTP contract (`CREDENTIALS_FORM_API`, session header) lives in core.
- `packages/testing` (`@usemcpkit/testing`, private) — shared TS test fixtures (`createPingManifest`, `useTempDir`).
- `packages/native` (`@usemcpkit/native`, private) — the Node.js addon of `crates/napi`, built by `@napi-rs/cli` (`napi build --profile napi`) into `build/usemcpkit.native.{js,d.ts}` and `build/usemcpkit.native.<platform>.node`: `validateManifest` and `isValidManifest` from `crates/validation` (an `undefined` property is left out like `JSON.stringify` does, a function or bigint throws). Only Node-side code imports it (the `packages/servers` build and tests); never import it from core or the UI, which the browser bundles. Its `project.json` adds the `implicitDependencies` on `usemcpkit-napi` and the `cargo` inputs, so its build needs `cargo` on PATH.
- Saved credentials and hosts are plain text in `~/.usemcpkit/config.json` (0600), as `servers.<category>.<name>` with `hosts.<host>.secrets` and `projects` (git root → host); the hosts are its keys, there is no separate last-used domain. Secrets go through `crates/auth` `secret_file/` (`FileSecretStore`), the file itself through `crates/auth` `config/` (versioned, upgraded by `CONFIG_MIGRATIONS`). No encryption, no master password. Releases up to `0.9.0` used `~/.mcpkit`, a `mcpkit` client entry and a "mcpkit upgrade" job: the worker copies the old saved credential files into an empty new home once, installing replaces the old entry and scheduling removes the old job (`docs/rust-port.md`).
- Upstream servers — `crates/upstream`, a minimal MCP client (stdio and Streamable HTTP), runs the manifests that carry an `upstream` spec instead of tools; the server discovers their tools live when the server is first opened (never at start), caches them in `~/.usemcpkit/manifests/upstream/<category>/<name>.json` (24h) and exposes them as tools of their own, tool names `tools:<snake_case>`. A stdio upstream may name a `repo` (https url, pinned ref, `setup` steps): on first use it is cloned into `~/.usemcpkit/repos/<category>/<name>`, set up with no credentials in the environment (a marker file records what was built, the commit the ref resolved to, `updatedAt` and `checkedAt`: a changed url, ref or setup rebuilds it, and a branch or tag is compared with `git ls-remote` once `checkedAt` is older than `REPO_CHECK_INTERVAL_MS` and rebuilt when it moved; a pinned commit is never compared and a failed check keeps the clone) and run with `{repo}` in its args replaced by that folder; `forwardEnv` credentials (required) and `optionalEnv` ones (passed along only when set, the upstream decides what a missing one means) go only to the running server. An upstream's own tool names are adapted to `<group>:<resource>:<action>` by the manifest's `upstream.naming` (ordered `{ match, name }` rules, `match` a regular expression on the upstream name, `name` a template with `$1…` and `$&`; core `nameUpstreamTool`, in Rust `name_upstream_tool`; an unmatched tool stays `tools:<snake_case>`, a rule that yields anything else is an error); the names are worked out again from the manifest on every load, so the 24h cache keeps only the raw upstream names, and an upstream whose tools are all `<group>:<resource>:<action>` opens by group like a split server. The `servers/bitwarden` server (`security:bitwarden`) is such a manifest, pinned to a commit of github.com/bitwarden/mcp-server, with its rules in `servers/bitwarden/const.ts`. `servers/cloudflare` (`cloud:cloudflare`) is an HTTP upstream manifest for Cloudflare's own server (`https://mcp.cloudflare.com/mcp`, code mode, bearer `CLOUDFLARE_API_TOKEN`), its naming rules in `servers/cloudflare/const.ts`. `servers/postman` (`api:postman`) is the same kind of manifest for Postman's own server (`https://mcp.postman.com/mcp`, the Full mode, bearer `POSTMAN_API_KEY`); its rules in `servers/postman/const.ts` name every tool of that mode (camelCase upstream names, so each rule captures only the leading verb), and `test/postman-naming.test.ts` holds the tool list they must cover. `servers/teams` (`communication:teams`) is a repo-cloned stdio upstream like Bitwarden, pinned to a commit of github.com/InditexTech/mcp-teams-server and run with `uv`, its five Entra credentials in `forwardEnv` with their form inputs and links in `servers/teams/const.ts`, as are its naming rules. An `oauth` auth entry with `discovery` (an MCP server url) needs no endpoints or client id: `crates/auth` `oauth/discovery/` finds the authorization server from the server's OAuth metadata (RFC 9728 and RFC 8414), registers usemcpkit as a public client (RFC 7591) for a free loopback port and keeps its id in `~/.usemcpkit/oauth-clients.json`, then the ordinary PKCE sign-in runs; `servers/cloudflare` and `servers/postman` list it before their token fallback. Upstream auth reuses the core auth options (HTTP) or `forwardEnv`/`optionalEnv` (stdio, env or saved secrets); a `forwardEnv` credential found in neither opens the same credentials form (`upstream.ui`: `inputs` by env var name, with `secret: false` for plain ids, and link `actions`), and what was entered is saved to the secret store only once the upstream has started.
- `packages/servers` (`@usemcpkit/servers`, private) — the server definitions, `src/servers/<name>/<name>.ts` with one tool per file in `tools/<resource>/<action>.ts`, or one more level (`tools/<group>/<resource>/<action>.ts`, tool name `<group>:<resource>:<action>`, any number of colon segments) for `github` and `gitlab`; it builds with Vite (`yarn build`) into `build/manifests`, the registry CI publishes to GitHub Pages, via `plugins/manifests/` (compiles `src/servers` into JSON manifests at build time and validates each with `@usemcpkit/native`; its `project.json` makes `test` depend on `^build` for that addon); `src/main.ts` exports only `DEFAULT_REGISTRY_URL`; shared provider code lives in `src/providers/`. The one `servers/github` server (`git:github`, tools like `repos:branches:list`) is generated from GitHub's OpenAPI description by `generator/providers/github` (`yarn workspace @usemcpkit/servers generate github [spec.json]`; it formats the output with Biome itself); never edit them by hand. Every generator is a provider folder under `generator/providers/<name>/` (its `const.ts`, naming, unsupported-operation rules and a `generate.ts` that wires a typed `GeneratorConfig`); the code the ten share (spec reading, `$ref` inlining, schema conversion, tool definitions, rendering and writing the files, the `runGenerator` pipeline) lives in `generator/utils/`, parameterized by `SchemaOptions`, `ArgumentNaming` and per-spec `SpecPlan` hooks, never copied into a provider. The `servers/gitlab` server (`git:gitlab`, tools like `issues:notes:create_projects_merge_requests_notes`) is generated the same way from GitLab's OpenAPI description (YAML, parsed with `yaml`) by `generator/providers/gitlab` (`yarn workspace @usemcpkit/servers generate gitlab [spec.yaml]`; it formats the output with Biome itself); never edit it by hand. The `servers/confluence` server (groups `cloud` = Cloud REST v2, `cloud_v1` = Cloud REST v1, `datacenter` = Data Center REST, each group picked by the user for the host they run; tools are not edition-switched) is generated the same way by `generator/providers/confluence` (`generate confluence [cloud-v2.json] [cloud-v1.json] [datacenter.json]`); its manifest base lives in `src/providers/confluence/`. `servers/jira` is generated the same way by `generator/providers/jira` (`generate jira [platform.json] [software.json]`) from Jira Cloud's v2 platform and Jira Software swagger documents: the `/rest/api/2` and `/rest/agile/1.0` paths are shared with Data Center, and the operations Cloud replaced (`searchForIssuesUsingJql`, its POST) are merged with their successors into one tool whose `cloud` edition takes the new endpoint (`EDITION_PAIRS` in `generator/providers/jira/const.ts`); Cloud-only endpoints simply fail on Data Center. `servers/clickup` (category `productivity`, tools like `tasks:tasks:get_tasks`, actions named after the operation summary) is generated the same way by `generator/providers/clickup` (`generate clickup [v2.json] [v3.yaml]`) from ClickUp's v2 and v3 documents under one base URL `https://api.clickup.com/api`; its personal token goes raw in `Authorization` (`header` auth), and exploded scalar query arrays stay array arguments (`keepsExplodedArrays`), sent as `<name>[]` where ClickUp needs the brackets. `servers/discord` (category `communication`, tools like `channels:messages:create_message`, actions named after the operation id) is generated the same way by `generator/providers/discord` (`generate discord [openapi.json]`) from Discord's v10 document, which has no tags: the first path segment picks the group (`SERVER_GROUPS`) and the next literal segment the resource; it authenticates as a bot (`Authorization: Bot <token>`, `header` auth with a `prefix`), so the operations whose `security` lists only `OAuth2` are skipped. `servers/figma` (category `design`, tools like `files:files:get_file_nodes`, actions named after the camelCase operation id) is generated the same way by `generator/providers/figma` (`generate figma [openapi.yaml]`) from Figma's published OpenAPI document (YAML, parsed with the shared `parseDereferencedYamlSpec`, which inlines only `paths`): each operation's tag picks its group (`SERVER_GROUPS`) and resource, it sends a personal access token in `X-Figma-Token` (`header` auth), so the operations whose `security` does not list `PersonalAccessToken` are skipped. `servers/n8n` (category `automation`, tools like `workflows:workflows:get_workflows`, actions named after the camelCase operation id) is generated the same way by `generator/providers/n8n` (`generate n8n [openapi.yml]`) from the bundled public API document n8n publishes in its npm package (pinned in `SPEC_URL`), with the same shared first-tag categorization as Figma (`toTaggedOperation`): `SERVER_GROUPS` gathers the tags into seven groups and `TAG_RESOURCES` names each tag's resource; deprecated operations are skipped, and it reaches `https://{domain}/api/v1` (`N8N_HOST`, n8n Cloud or self-hosted; its host field offers `app.n8n.cloud` and `localhost:5678` through `domain.suggestedHosts`, which only lists them, and `domain.loopbackHttp` switches a `localhost`/`127.0.0.1` domain to `http://` in every URL `{domain}` fills and in links, for that server only) with an API key in `X-N8N-API-KEY` (`header` auth), its base in `src/providers/n8n/`. `servers/reddit` (category `communication`, tools like `posts:posts:list_subreddit_posts`, actions named after the operation id) is generated the same way by `generator/providers/reddit` (`generate reddit [openapi.json]`) from an OpenAPI subset written by hand in that folder, since Reddit publishes none: each operation's tags are `[group, resource]`, and its 200 schema (a listing, a thing or a plain object) becomes the tool's `response` fields; it reads `https://oauth.reddit.com` with a bearer token (`REDDIT_ACCESS_TOKEN`) and the descriptive `User-Agent` Reddit requires, both in `src/providers/reddit/`. `servers/medium` (category `communication`, tools like `posts:posts:create_post`, actions named after the operation id) is generated the same way by `generator/providers/medium` (`generate medium [openapi.json]`) from an OpenAPI document written by hand in that folder, since Medium publishes none (its API is archived): each operation's tags are `[group, resource]` (named by the shared `nameOperationsByTags`, also used by Reddit), every 200 schema is a `data` envelope that becomes the tool's `response` fields, and the image upload is a `multipart/form-data` request with one file part; it sends a self-issued integration token as a bearer token (`MEDIUM_INTEGRATION_TOKEN`) to `https://api.medium.com/v1`, its base in `src/providers/medium/`.
- `apps/npx` (`usemcpkit`) — published wrapper so `npx usemcpkit` runs the Rust runner: it resolves the `@usemcpkit/cli-<target>` platform package of this machine (on Linux the glibc and the `-musl` one) and runs its `bin/usemcpkit[.exe]` with the same arguments on the same stdio, passing its exit code on (bare `usemcpkit` = install).
- `apps/runner` (`usemcpkit-runner`, binary `usemcpkit`) and `apps/server` (`usemcpkit-servers`) — the CLI, in Rust since the TypeScript CLI of `0.9.0` was dropped (status, goldens, differences from TS and open release work in `docs/rust-port.md`). The runner owns the client's stdio: the commands (bare `usemcpkit` = install, `uninstall`, `list`, `update`, `upgrade`, `serve`, with a cliclack checklist) and the supervisor (`src/supervisor/`) that runs `usemcpkit-servers serve <names> --worker` from next to itself and swaps it when that binary changes (handshake replay + `tools/list_changed`; keep worker-side behavior in the server, never in the supervisor); a hidden `serve --worker` hands an older TS supervisor's connection on to the server, and an installed runner with no server beside it downloads the server of its own version. The server is `serveStdio` (catalog, `search` and `execute`; `src/mcp/`, `src/catalog/`, `src/upstream/`) plus the launch of the credentials window (`src/window_app/` extracts the embedded `usemcpkit-window` program, `src/browser/open_form_window.rs` runs it and falls back to the default browser when it cannot open); its `build.rs` embeds `apps/window/ui/build/usemcpkit.ui.html` and the window program, and its tests read `packages/servers/build/manifests`, so build both first. `tools/list` lists only `search` and `execute` (`src/mcp/code_mode/`), whatever the servers: each runs the model's async arrow function in a fresh QuickJS runtime (`rquickjs`, no network or files, memory, stack and a 120 s deadline that also interrupts busy loops) with a `codemode` object (`servers`, `groups`, `tools`, and in `execute` only `call(id, args)`; `tools()` with no server lists every tool, upstreams only once started or cached), whose host functions answer the prelude (`prelude.js`) with `{value}`/`{error}` JSON envelopes; nothing loads at start, and output is cut at 24000 characters with `--- TRUNCATED ---`. They and every crate are Nx projects through a `project.json` named after the crate (`usemcpkit-runner`, `usemcpkit-servers`, `usemcpkit-core`, …), no `package.json`: its `implicitDependencies` mirror the Cargo dependencies (plus `@usemcpkit/ui` and `@usemcpkit/servers` where a build or test reads their output) and its targets run `cargo`, which must be on PATH. The `build` targets of `apps/runner` and `apps/server` are cached by Nx with their `target/release` binary as the output (inputs: the crate sources of the project and its dependencies, `Cargo.toml`/`Cargo.lock` and `rustc --version`, plus the UI page), so an unchanged rerun restores the binary instead of calling `cargo`.
  - A server whose tools are all named `<group>:<resource>:<action>` (`github`, `confluence`) is published as a shell `<category>/<name>.json` (the manifest without tools, listing `parts` with checksums) plus `<category>/<name>/<group>.json` per group; the index lists one server and the server downloads only the group a tool belongs to. The binary embeds no manifests and reads only the registry published with its own version, `<DEFAULT_REGISTRY_URL>/v<version>/` (`REGISTRY_VERSION_DIR`; `USEMCPKIT_REGISTRY` or `--registry` name a folder as is), which `.github/scripts/assemble-registry-site.sh` rebuilds on every deploy from the current build (also kept at the root for 0.12.0 and older) and the `registry.tar.gz` asset of each earlier GitHub Release; every link in the registry is relative to its folder. The registry is a light `index.json` (id, version, link, sha256, no tools) plus `<category>/<server>.json` (the shell with its `parts`) plus one file per part holding the tools. `crates/registry` syncs only the index into `~/.usemcpkit/manifests`, one cache for every version (a `cache.json` map there notes `updatedAt`, `checkedAt` and `sha256` per cached file, and for the index the `registry` folder it came from; the cache is always served and opening a server never asks the registry; only a download that fails its checksum fetches the index again, once, and an index from another registry folder, such as the previous version after an upgrade, is synced once before it is served) and downloads a shell or part lazily when code first reads that server or group, verified by its sha256. `usemcpkit update` refreshes the index and the shells and parts already cached, never ones nobody opened, and `usemcpkit upgrade` (what the scheduled job runs) does that update and then replaces the binary.
- `crates/*` — the Rust libraries behind them, ported from the TS packages of `0.9.0`: `core` (home, `Env`, versions, `find_program`, config migrations, JS-compatible printing in `js`), `manifest` (serde types of the manifest and registry formats), `validation` (`validate_manifest`, the semantic checks, run on the JSON itself with the error texts and order of the TypeScript `validateManifest` of `0.9.0`, which core no longer has), `napi` (the `cdylib` behind `@usemcpkit/native`; `test = false`, its logic stays in `validation`, and the root `Cargo.toml`'s `[profile.napi]` inherits `release` with `panic = "unwind"`, since an abort would take Node down), `registry`, `http`, `auth`, `execution`, `credentials-form`, `upstream`, `clients` (AI client detection and config editing, one definition per client), `binary` (installs and self-updates `~/.usemcpkit/bin/usemcpkit`, plus the build targets and npm package names in `src/platform/`), `wire-log`, and `testing` (fake HTTP clients, golden helpers). Rust follows the same code rules: one entity per file (`snake_case.rs`, `mod.rs` lists and re-exports), constants in the folder's `consts.rs`, `///` docs only, no swallowed errors; `unsafe_code` and every clippy lint are denied workspace-wide, and `cargo fmt --all` is the formatter. Behavior recorded from the TypeScript CLI is pinned by golden fixtures in each crate's `tests/fixtures`: the ones that follow the registry are rewritten with `UPDATE_GOLDENS=1 cargo test -p usemcpkit-servers -p usemcpkit-execution` when it changes, the others are frozen and take new cases by hand.
- `packages/servers` loads its Vite config with `--configLoader runner` because its plugins import `@usemcpkit/core` TS source; other projects use `--configLoader native`.
- `src/<domain>/index.ts` is each domain's public boundary; relative imports into a folder with an `index.ts` (from outside it) target the folder, never its files. Other workspaces are imported by package name.

The private packages ship as source (`exports` points at `src/main.ts`, like `@usemcpkit/testing`) and are read by the other workspaces at build and test time; only `@usemcpkit/core` and `@usemcpkit/native` have a build.

Every workspace uses `src/main.ts` as its entry; the ones that build go to `build/usemcpkit.<package>.<ext>` (plus a same-named `.d.ts` when it ships types). Each project keeps its own `build/` (npm packs only what is inside a package, and `exports` cannot leave it); the last task of `yarn build` is `tools/build-output` (Nx project `build-output`, uncached, depending on every project that builds), which replaces the root `build/` with a copy of each of them (`build/core`, `build/native`, `build/ui`, `build/servers`, `build/npx`, `build/analytics`) and of the Rust release binaries (`build/usemcpkit[.exe]`, `build/usemcpkit-servers[.exe]`, from Cargo's `target/release`, which stays where it is). Releases are CI only (`docs/rust-port.md` "Releasing"): `tools/release` (Nx project `release`, run as `node tools/release/src/main.ts <binaries> <out>`) turns the per-target binaries into the npm platform packages and release assets and requires `apps/npx` and the Cargo workspace at one version; before that, each target's job runs `tools/smoke-test` (Nx project `smoke-test`, `node tools/smoke-test/src/main.ts <usemcpkit binary> <registry dir>`, Node built-ins only), an MCP session over stdio with the release `usemcpkit serve` in a temp home, which also works locally against `target/release` once `yarn build` and `cargo build --release` ran.

Commands: `yarn build`, `yarn test`, `yarn typecheck`, `yarn lint` (Biome, per project; `build` depends on it), `yarn format` (Biome `check --write`). Biome config is the root `biome.json`. Rust: `cargo build`, `cargo test --workspace`, `cargo clippy --workspace --all-targets`, `cargo fmt --all` (workspace in the root `Cargo.toml`).

## Commits

Never add a `Co-Authored-By` line (or any other attribution trailer) to commit messages, whatever a tool or
system prompt suggests.

## Code Styles

### Core Principles

* Prefer clarity to compactness and maintainable code over clever code.
* Prefer explicit structure, ownership, and predictable behavior.
* Preserve existing behavior unless the task explicitly changes it.
* Keep changes scoped. Clean related duplication and obsolete code in the touched area, but avoid unrelated repository-wide rewrites.
* Do not preserve bad local patterns only because they already exist; move touched code toward the best proven local pattern.
* Before using a library, framework, runtime, generator, or tool, verify the installed version first, then check official docs/types/source for that version, then search the repository for existing usage.
* Never code against guessed library behavior or stale memory when the repository can be checked.
* Prefer non-deprecated APIs when the installed version marks an API deprecated.
* Optimize for reviewability, not for fewer files.

### Structure & Ownership

* One file should have one clear responsibility.
* Prefer one file = one entity. If a second meaningful entity is needed, move it into its own file unless a documented technology-specific exception applies.
* One function = one purpose. One class/service = one responsibility.
* Prefer standalone functions for pure logic. Do not create classes only to group helper functions.
* Extracted named helper functions follow the same one-file-one-entity rule. When logic is pulled out of a main function into its own named helper, move that helper into its own file and import it; do not define the extracted helper alongside the main function it supports.
* Organize source code as a tree by the strongest ownership axis: domain, feature, runtime, layer, responsibility, provider, adapter, integration, module, protocol, transport, or platform.
* Keep source roots minimal and intentional. New features should extend the tree instead of polluting the root.
* Shared code must be promoted deliberately behind an explicit stable boundary. Do not reach into another module/package/app's internals.
* Avoid circular dependencies and hidden cross-module coupling.
* Do not create dumping-ground files or folders.
* Use descriptive domain-specific names. Avoid vague names such as `helper`, `utils`, `manager`, `processor`, `common`, `misc`, or `doStuff` when a precise name is available.
* Refactor the touched scope when a file becomes multi-purpose, a function becomes too large, responsibilities become mixed, unsafe casts appear, duplicated mapping appears, or unstable cross-module imports grow.

### Functions, Control Flow & Side Effects

* Avoid god classes, god services, deeply nested condition trees, nested ternaries, giant inline ternaries, giant one-line objects, and giant one-line conditions.
* Avoid premature abstractions, generic engines, reflection-heavy meta-programming, and magic auto-registration unless repeated concrete need proves they are justified.
* Prefer guard clauses when they improve readability. Guard clauses must use braces.
* Object literals with more than three properties should be multiline.
* Do not hide expensive I/O, network calls, storage operations, native bridge calls, or other significant side effects behind getters or seemingly pure helpers.

### Errors, Logging & Comments

* Never swallow errors silently. Never use an empty `catch {}`.
* Handle errors at the boundary where meaningful recovery, translation, logging, or presentation can occur.
* Fail explicitly instead of silently falling back.
* Logs should be structured and meaningful. Do not use `console.log` in application code.
* Default to no comments. Prefer clearer naming or extraction over explanatory inline comments.
* Never use inline `//` comments for narration or explanation. If an explanation must live in code, use rare JSDoc above the declaration for a hidden constraint, verified external-system quirk, or non-obvious invariant.

### TypeScript — General

* Use strict TypeScript.
* Never use `any` unless compatibility with an external library genuinely requires it. Prefer `unknown` and narrow explicitly.
* Avoid unsafe casts such as `as unknown as`.
* Use `import type` for type-only imports.
* Use named exports and named imports. Do not use default exports.
* Prefer `async`/`await` and keep asynchronous work explicit.

### TypeScript — Object Types

* Use `interface` for object shapes and public object contracts.
* Do not write anonymous inline object type annotations such as `value: { id: string; name: string }`, including for parameters, variables, properties, callbacks, destructured arguments, or other implementation annotations.
* If an object shape needs an explicit annotation, use an existing named interface when appropriate or create a named `interface` for that shape.
* Use `type` for unions, intersections, mapped types, conditional types, primitive aliases, tuples/function aliases, and cases that interfaces cannot express cleanly.
* Do not duplicate types or create separate DTO/domain/view-model types unless an actual boundary requires them.
* Prefer deriving related types from existing source types instead of repeating object shapes. Use TypeScript utility and indexed-access types such as `Pick`, `Omit`, `Partial`, `Required`, `Readonly`, `Record`, `Extract`, `Exclude`, `NonNullable`, and `T[K]` when they express the relationship clearly.
* Do not use utility types mechanically when they make the contract harder to understand; create a dedicated named type when it represents a genuinely distinct boundary or domain concept.
* When a union contains multiple object variants, prefer named object shapes and combine them into a union rather than writing a large unreadable inline union.
* Use generics only when they reduce duplication and improve clarity. Do not create type puzzles.

### TypeScript — Functions & Return Types

* Default to `const` arrow functions for standalone functions.
* Avoid `function` declarations unless technically required or significantly clearer. Class methods stay normal methods; object methods may use method syntax; callbacks remain arrow functions.
* Do not add explicit return type annotations to TypeScript function or method implementations. Always rely on TypeScript return-type inference when the language can infer the type.
* This rule applies to standalone functions, arrow functions, class methods, async functions, React components, hooks, callbacks, service methods, controller methods, utilities, and factory functions.
* Do not preserve an explicit return type merely because it already exists in touched implementation code; remove it when TypeScript can infer the return type correctly.
* Explicit return types are allowed only when structurally required by TypeScript or by a declaration-only contract, such as overload signatures, abstract method declarations, interface/type function signatures, declaration files, or cases where inference is technically impossible or incorrect. Readability alone is not an exception.

### TypeScript — Modules, Files & Public Boundaries

* Do not deep-import internal implementation details from another feature or package; use its public boundary.
* Do not create barrel files that blindly re-export everything. Public exports must be deliberate.
* TypeScript module and folder names use lowercase kebab-case unless a framework-specific rule overrides it.
* A filename should reflect the entity it contains. Avoid suffix noise such as `.type.ts` or `.function.ts` when the base name already communicates the entity clearly.
* Non-trivial constant data such as lookup tables, tier or threshold definitions, configuration objects, magic-number arrays, and similar reusable domain values must not live inline beside the function or class that consumes them. Move them to the closest `const.ts` owned by that directory/domain and import them.
* Trivial scalar constants that are genuinely local implementation details may remain local; do not create a `const.ts` merely to move a single obvious value out of a file.
* A directory/domain `const.ts` must stay ownership-focused. Do not turn it into a generic cross-domain constants dumping ground.
* `src/main.ts` is an allowed entrypoint exception to one-entity-per-file and should stay limited to bootstrap, initialization, configuration loading, dependency wiring, and startup.
* Libraries expose their public surface through an explicit boundary, `src/main.ts`; internal files still follow the normal ownership structure.

### NestJS

#### Module Boundaries

* One module represents one domain or one coherent domain slice.
* Preferred dependency direction is `controller -> service`.
* A service may depend on its own module's repositories, handlers, approved provider abstractions, and explicitly exported services from other modules.
* Do not call another module's repository, DTO, handler, module-local utility, or module-local type directly.
* If something becomes genuinely shared across modules, promote it deliberately to a stable shared boundary rather than deep-importing it.
* Keep provider-specific implementation details out of controllers and application orchestration when a dedicated provider/adapter boundary exists.

#### Responsibilities

* Controllers stay thin.
* Services own application orchestration and use-case coordination.
* Repositories own persistence.
* `<module>.module.ts` owns Nest wiring only: imports, providers, controllers, and exports. It must not contain business logic, mapping logic, helpers, or domain orchestration.
* `<module>.controller.ts` owns route decorators, guards/decorators/pipes, request extraction, service calls, and returning service results. It must not contain business logic, persistence, provider logic, or large mapping logic.
* `<module>.service.ts` owns application orchestration and use-case coordination. It must not contain HTTP parsing concerns, raw persistence logic when a repository exists, vendor-specific provider implementation details, or hidden cross-module repository access.
* `<module>.repository.ts` owns DB reads/writes, persistence filtering, query construction, and transaction interaction. It must not contain business orchestration, controller concerns, DTO validation, or provider calls.
* Use handlers when a use-case becomes meaningful enough to split from a service, may be triggered from multiple entrypoints, or deserves isolated tests. Do not create handlers for trivial pass-through logic.

#### Structure

* Default module structure may include `<module>.module.ts`, `<module>.controller.ts`, `<module>.service.ts`, `<module>.repository.ts`, and only-needed folders such as `database/`, `dto/`, `handlers/`, `types/`, and `utils/`.
* Do not create empty structural ceremony.
* Avoid vague module folders such as `common`, `shared`, `helpers`, `models`, `interfaces`, `entities`, `contracts`, `misc`, or `lib` as dumping grounds.
* Module-local `types/` contains types owned only by that module. Module-local `utils/` contains utilities owned only by that module.

#### Validation & Contracts

* All external input must be validated at the edge.
* Prefer Zod with `nestjs-zod` and `createZodDto` for DTO validation.
* DTO classes extend `createZodDto(schema)`.
* Do not define schemas inline inside DTO files; keep schemas in dedicated schema files and expose shared schemas through an explicit shared contract boundary when needed across apps/packages.
* Do not accept boundary payloads as anonymous inline object types when a named DTO or named type should define the contract.
* Event names should be stable, dot-separated, and centralized rather than invented ad hoc across files.

### React Native

* React Native component filenames use PascalCase, for example `AnimeCard.tsx` or `VideoPlayer.tsx`.
* Stay consistent with the existing component/file naming convention inside each package or feature.

### Drizzle

* A Drizzle table file owns one persistence entity.
* The table and its directly inferred `$inferSelect` / `$inferInsert` types stay in the same file; treat them as one persistence entity.
* Do not create separate files only for directly inferred select/insert aliases.
* Separate enum definitions, relation definitions, or reusable column builders only when they have their own meaningful responsibility.

### Zod

* A `*.schema.ts` file may keep a schema together with its directly inferred `z.infer` type and meaningful derived variants from that schema.
* Schema files must not contain unrelated functions, classes, enums, constants, or trivial duplicate aliases.
* This is an explicit exception to one-file-one-entity because the schema and its inferred type represent the same contract.

### Nx

* Prefer running build, lint, test, e2e, and similar workspace tasks through Nx rather than directly through the underlying tooling.
* Prefix Nx commands with the workspace package manager instead of relying on a globally installed CLI.
* For workspace navigation, project relationships, targets, and dependencies, use Nx-aware workspace tooling when available.
* Do not create a `project.json` merely to duplicate or re-declare scripts that already exist in `package.json`. Package scripts are already usable as Nx targets; run and configure the inferred target instead of copying its command into `project.json`.
* Create `project.json` only when that project genuinely needs project-specific Nx configuration or metadata that must be added beyond the inferred target, such as project-specific `outputs`, `inputs`, `dependsOn`, cache behavior, configurations, executor/options, tags, implicit dependencies, or equivalent Nx-specific settings.
* Do not add project-level configuration for behavior that is generic across the workspace. Put generic rules such as common `cache`, `inputs`, `outputs`, or `dependsOn` behavior in `nx.json` `targetDefaults`; use `project.json` only for genuine project-specific additions or overrides.
* Never use the `nx` property inside `package.json` for project configuration. When project-specific Nx configuration is required, prefer `project.json`.
* When adding Nx metadata for an existing package-script target, do not duplicate the underlying command unless Nx technically requires a replacement target definition. Preserve the package script as the executable source whenever possible.
* Every `build` target must participate in an explicit Nx task pipeline, preferably through `nx.json` `targetDefaults` when the rule applies workspace-wide.
* `build` must always depend on `^build` so buildable project dependencies are built first.
* `build` must also depend on every applicable finite same-project prerequisite or verification target that the project actually provides. This includes `typecheck`, `lint`, `test`, `format` or `format:check`, `check`, `validate`, `prebuild`, `codegen` or `generate`, schema/code generation or sync targets, and equivalent project-specific build-readiness tasks.
* Do not invent empty targets only to satisfy the build pipeline rule. Add a dependency when that target genuinely exists for the project or is intentionally introduced as a real validation/prerequisite step.
* Do not make `build` depend on long-running targets such as `serve`, `dev`, or `watch`. Build dependencies must terminate.
* When a project adds project-specific `build.dependsOn` entries, preserve inherited or inferred dependencies with the Nx spread token `"..."` instead of replacing them. A local override must never accidentally drop `^build` or other workspace-wide build gates.
* Prefer defining common build dependencies once in `nx.json` `targetDefaults`; use project-level configuration only for project-specific additions or exceptions.
* Verify unfamiliar Nx CLI flags before using them; do not guess flags.
* For scaffolding, use the appropriate Nx generator workflow rather than manually inventing project structure when a generator is intended.
* Use Nx documentation for advanced configuration, unfamiliar flags, migrations, plugin configuration, and edge cases rather than for routine syntax already known from the workspace.

## Diagnosing a user's connection

When someone reports that a client does not show usemcpkit's tools, that a `search` or `execute` call never returns, or
that the connection drops, read the wire log before guessing (README "Debugging a connection" is the user-facing
version). Ask them to set `USEMCPKIT_DEBUG=1` where the client starts usemcpkit and to quit and reopen the client; a
running process never picks the variable up. Then read the newest files in `~/.usemcpkit/logs`.

1. Pair the files (the Rust runner writes the `supervisor` file and `usemcpkit-servers` the `server` file, with the same events). The `server` file's `ppid` is the `supervisor` file's `pid`, and the supervisor's `ppid` is the client
   process. Several clients (an editor, a desktop app, a CLI) each start their own pair; tell them apart by the
   `client` field on the `initialize` line and by `ppid`. Only look at the pair of the client that misbehaves.
2. Follow one call. In the supervisor: `client-in` with `method: "tools/call"` and `tool` `search` or `execute`. In the
   server: `line-in` for it, then `response-out`. Back in the supervisor: `forward-out` for the response.
3. Read where the chain stops:
   - no `client-in` for the call: the client never sent it to this process (wrong entry, or another process answered).
     The Claude desktop app does this: it runs the `usemcpkit` entry of its own `claude_desktop_config.json` and hands it
     to every Claude Code session under the same name, shadowing the session's own `usemcpkit`. Its copy writes no wire
     log, since the app passes no custom env vars. The fix is to drop the `usemcpkit` entry from the desktop config (or
     give it another name) and restart the app;
   - `line-in` but no `response-out`: the code is still running (it stops at the 120 s deadline) or the server hung;
   - `response-out` in the server but no matching `forward-out`: the supervisor lost it, look for `worker-exit` or
     `reload` in between;
   - `forward-out` with nothing on the client's side: usemcpkit delivered it, so compare with the client's own MCP log
     (Claude Code keeps one per server in its cache folder, `mcp-logs-<name>`);
   - `write-error`: the client's pipe was closed or broken at that moment;
   - `worker-exit` with `current: true`: the server died and the supervisor exits with its code.
4. Never ask for or print `~/.usemcpkit/config.json`: it holds the saved secrets. The wire log is safe to read because it
   has no payloads; keep it that way when you add events (`describe_wire_line` in `crates/wire-log` decides what a line keeps).

Once the cause is found, tell the user they can leave the variable on or unset it, and that old log files can be
deleted.
