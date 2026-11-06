# Rust port

The `usemcpkit` binary was a Bun-compiled TypeScript CLI of about 113 MB. On branch `feat/rust` it is two Rust binaries:

- `usemcpkit`, the runner, is what clients start;
- `usemcpkit-servers`, the MCP server, runs behind it.

The servers, their generators, `packages/ui` and the `@usemcpkit/core` authoring API stay in TypeScript. The built JSON
manifests and the built UI page are the contract between the two sides. The TypeScript CLI (`apps/cli` and the packages
it bundled) is gone, and `@usemcpkit/core` keeps only the authoring API; what the TypeScript CLI of `0.9.0` did is kept
in the golden fixtures below.

## Layout

| Path                     | Crate                     | What it owns                                                                                                                                   |
| ------------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/runner`            | `usemcpkit-runner` (`usemcpkit`) | The commands (`install`, which a bare `usemcpkit` runs, plus `uninstall`, `list`, `update`, `upgrade` and `serve`) and the supervisor that owns the client's stdio and swaps the server when its binary changes. |
| `apps/server`            | `usemcpkit-servers`           | `serve [servers...] --worker`, which runs the catalog, sections and tool calls over stdio, and `window <url>`, the wry/tao credentials window. `build.rs` embeds `packages/ui/build/usemcpkit.ui.html`. |
| `crates/core`            | `usemcpkit-core`             | The usemcpkit home, `Env`, versions, `find_program`, config migrations, and JavaScript-compatible number, string and JSON printing.             |
| `crates/manifest`        | `usemcpkit-manifest`         | Manifest and registry types (serde), domains and editions, and UI texts.                                                                       |
| `crates/registry`        | `usemcpkit-registry`         | The index and manifest cache in `~/.usemcpkit/manifests`: sync, checksums, lazy shell and part downloads, `ensure_manifest_index`.                |
| `crates/http`            | `usemcpkit-http`             | Request and response data, the `HttpClient` trait and the reqwest client.                                                                      |
| `crates/auth`            | `usemcpkit-auth`             | `config.json`, secrets and tokens, the domain of a call, fallbacks, OAuth2 PKCE sign-in, and the credentials form contract.                     |
| `crates/execution`       | `usemcpkit-execution`        | Tool arguments, the request a tool builds, the auth it tries, response mapping, and upstream access.                                           |
| `crates/credentials-form` | `usemcpkit-credentials-form` | The one-off loopback credentials page server.                                                                                                  |
| `crates/upstream`        | `usemcpkit-upstream`         | The MCP client for upstream manifests: stdio, optionally run from a cloned repository, and Streamable HTTP.                                    |
| `crates/clients`         | `usemcpkit-clients`          | AI client detection and config editing: a port of jsonc-parser for JSON, and line-based edits for Codex TOML.                                   |
| `crates/binary`          | `usemcpkit-binary`           | Build targets, npm releases and integrity, install and self-update of both binaries, and the `usemcpkit upgrade` schedule.                         |
| `crates/wire-log`        | `usemcpkit-wire-log`         | The `USEMCPKIT_DEBUG` wire log that both binaries write.                                                                                       |
| `crates/testing`         | `usemcpkit-testing`          | Fake HTTP clients and small manifests for tests.                                                                                               |

**Build order.** Build the TypeScript side first, since the server embeds the UI page and its tests read the built
registry:

1. `yarn workspace @usemcpkit/ui build`
2. `yarn workspace @usemcpkit/servers build`
3. `cargo build`

Or let Nx order it: every crate is an Nx project named after it (a `project.json`, `implicitDependencies` taken from
its Cargo dependencies), so `yarn nx run usemcpkit-servers:build` builds the UI page and the registry first. The
targets call `cargo`, so `cargo` has to be on PATH.

## Golden fixtures

Each golden fixture was first written by a TypeScript generator test, and a Rust test compares against it. The
generators went with the TypeScript CLI, so Rust owns the fixtures now:

- the ones that follow the registry are rewritten from Rust when it changes, with
  `UPDATE_GOLDENS=1 cargo test -p usemcpkit-servers -p usemcpkit-execution` (review the diff before committing it);
- the others hold their own inputs (manifests, client configs) and are frozen: a new case is added to the file by hand.

| Fixture                                                            | Rust test               | Kept up by        |
| ------------------------------------------------------------------ | ----------------------- | ----------------- |
| `apps/server/tests/fixtures/exposed-tools.json`                    | `exposed_tools.rs`      | `UPDATE_GOLDENS=1` |
| `apps/server/tests/fixtures/session.json`, `tool-digests.json`     | `session_parity.rs`     | `UPDATE_GOLDENS=1` |
| `apps/server/tests/fixtures/upstream-naming.json`                  | `upstream_naming.rs`    | `UPDATE_GOLDENS=1` |
| `crates/execution/tests/fixtures/teams-forwarded-credentials.json` | `upstream_access.rs`    | `UPDATE_GOLDENS=1` |
| `crates/execution/tests/fixtures/requests.json`                    | `request_golden.rs`     | frozen            |
| `crates/auth/tests/fixtures/credentials-form.golden.json`          | `credentials_golden.rs` | frozen            |
| `crates/validation/tests/fixtures/validation.golden.json`          | `validation_golden.rs`  | frozen            |
| `crates/clients/tests/fixtures/config-edits.json`                  | `config_edits.rs`       | frozen            |

The credentials golden is not named `credentials.json` because `.gitignore` ignores every file with that name. Its
`constants` are also what `packages/core/test/credentials-form-contract.test.ts` checks the page's form constants
against, so the page and the server cannot drift apart.

`crates/execution/tests/bundled_servers.rs` runs tool calls of the built GitHub, GitLab, Jira, Confluence, ClickUp,
Discord and Reddit manifests and checks the requests they send (the cases `packages/servers/test/servers.test.ts` ran
through the TypeScript executor).

**What `session_parity.rs` covers.** It replays a fixed client session through `McpServer::handle_line`. The session
includes:
- protocol errors;
- section opens for Medium, Reddit, ClickUp, Jira and GitHub groups;
- tool listings with their descriptions and input schemas.

Then it opens every section of every server that is not an upstream and compares a sha256 of each tool as `tools/list`
sends it. It allows only two differences: the JSON syntax error text (compared by code and `parse error:` prefix) and
`serverInfo.version`, which each side takes from its own build. Mutation-checked: dropping `required` from the schemas
fails 4076 tool digests.

## Behavior that differs from TypeScript

**Registry and manifests**
- `validateManifest` (semantic validation) is `crates/validation` only, which `packages/servers` calls through
  `@usemcpkit/native` when it builds the registry; `@usemcpkit/core` no longer exports it. The binaries do not run it on downloaded manifests yet (serde checks
  their structure only), and `validate` is not a runner command. A naming rule's broken `match` is reported with the
  `regex` crate's error text instead of JavaScript's.

**Protocol and errors**
- JSON parse error texts differ from Node's.
- A tool result for a mapping that found nothing is `{"content":[{"type":"text"}]}`, with no `text`, as the TS server
  sends it. That is not valid MCP `TextContent`.

**Upstreams**
- **Tool cache:**
  - a tool cache whose `discoveredAt` does not parse counts as stale (TS: `NaN`, never stale);
  - a failed hydration is retried by the next caller (`OnceCell`) instead of being shared;
  - the manifest is read at hydrate time, not per connect;
  - a listed tool with no name is an error.
- **Starting programs:**
  - setup and stdio programs resolve through PATHEXT, so `npm.cmd` works on Windows (TS `execFile` cannot);
  - setup output has no 16 MB cap;
  - failures read "exited with code N" or "timed out after Ns" instead of Node's texts.
- **Streamable HTTP:**
  - a reply that is not JSON is an `UpstreamError`;
  - a failed session `DELETE` is warned about.
- **The connection:**
  - a request sent after the child exited fails at once with the exit reason;
  - messages that carry a `method` never settle a request.

**Credentials page**
- It fails before announcing a URL when the page lacks `#usemcpkit-request`.
- CLI import errors read "Command failed" or "timed out" differently from Node.

**Clients**
- A client whose config cannot be read is named above the install checklist as a warning, instead of a disabled item
  (cliclack has none).
- Config IO error texts (`DetectedClient.problem`) differ from Node's.

**Binaries**
- The target is detected at compile time.
- `install` never downloads; TS did when it ran under Node.
- A scheduler command that times out is an error, not exit 1.
- gunzip error texts differ.
- `upgrade` reads the installed version from the last word of `--version`. clap prints `usemcpkit 0.9.0`; the TS binaries
  print a bare version.
- After an auto-update, a running runner keeps reporting its old version until a client restarts it, as in TS.

**Not ported**
- Usage reporting (`onToolUse`, analytics).

## Moving users from the TypeScript binary

- A TS supervisor that is already running restarts whatever binary replaced its own as `serve <names> --worker`. The
  runner accepts that hidden flag and hands the connection on to `usemcpkit-servers` on the same stdio.
- The TS updater replaces only the runner. When the installed runner finds no `usemcpkit-servers` next to it, it downloads
  the server of its own version from npm (`restore_server_binary`) before serving.

## Moving users from the `mcpkit` name

Releases up to TS `0.9.0` were named `mcpkit`: the command `mcpkit`, the home `~/.mcpkit`, the client entry `mcpkit`
and the scheduled job "mcpkit upgrade" (launchd `org.mdreal.mcpkit.upgrade`, cron marker `# mcpkit: scheduled upgrade`).
TS and Rust handle them the same way:

- The client entry is `mcpkit` again: 0.10 and 0.11 wrote `usemcpkit`, so installing writes `mcpkit` and drops a
  `usemcpkit` one from the same config, and the client never starts both; uninstalling removes both. A client with only
  the `usemcpkit` entry counts as configured (`LEGACY_ENTRY_NAMES`).
- Every update of the upgrade schedule also removes the old job, so it stops upgrading the old binary; uninstalling
  removes both.
- `serve` (the worker) copies `config.json`, `secrets.json` and `tokens.json` from `~/.mcpkit` into `~/.usemcpkit`
  once, while the new home has none of them (`adopt_legacy_home`). It never does with `USEMCPKIT_HOME` set, and it
  leaves the old folder alone. Caches, cloned repos and logs are not copied: they come back on first use.
- The old `MCPKIT_*` variables are no longer read. The old entry is replaced as a whole, its `env` (Codex
  `[mcp_servers.mcpkit.env]` included) with it: `MCPKIT_AUTO_UPDATE=0` must become `USEMCPKIT_AUTO_UPDATE=0`, and
  credentials under a custom `MCPKIT_HOME` are not adopted, since only `~/.mcpkit` is looked at.
- An installed TS `0.9.0` updates itself from `package/bin/mcpkit[.exe]` of the platform package and knows nothing of
  the new names. Until a release ships that path too, those installs stay on `0.9.0`, and `npx usemcpkit` moves them
  over once.

## Releasing

`.github/workflows/release-build.yml` runs `yarn build` (every lint, test and build gate) on Ubuntu; the registry is
deployed from it alone. `release-binaries.yml` then builds the two binaries per target on that target's own runner
(`linux-x64`, `linux-arm64`, `darwin-x64`, `darwin-arm64`, `windows-x64`) from the credentials page the first job
built, checks that each prints `--version` and runs `tools/smoke-test` against them (`node tools/smoke-test/src/main.ts
<usemcpkit binary> <registry dir>`: the real `usemcpkit serve`, with the server next to it, over stdio in a temp home
seeded from the first job's registry, partial loading on, auto-update off and the registry unreachable; it initializes, lists one section
per indexed server, opens `git:github` and expects the `list_changed` notice and its groups; it does not open the
credentials window or reach the network; the package job runs it once more on the packaged `cli-linux-x64`, with only
the WebKitGTK runtime installed), and `tools/release` writes each
`@usemcpkit/cli-<target>` package with `bin/usemcpkit[.exe]` and `bin/usemcpkit-servers[.exe]`, the GitHub Release
assets (`usemcpkit-<target>[.exe]`, `usemcpkit-servers-<target>[.exe]`) and the wrapper's `optionalDependencies` at the
release version, beside the core and wrapper builds of the first job. It fails unless `apps/npx` and the Cargo workspace have the same version. `publish-npm.sh` skips any
version npm already has, so a release only publishes what was bumped.

The first Rust release is `0.10.0`, for the binaries, the wrapper and `@usemcpkit/core` alike: npm already has a TS
`0.9.0` of each, with no server in the platform packages. Before `1.0.0` a minor bump is the breaking one, which core
needs for losing its runtime exports (executor, auth, mapping) and `validateManifest`/`isValidManifest`.

## Release work still open

- No musl packages: the server links WebKitGTK dynamically, which has no static build, so `@usemcpkit/cli-*-musl`
  stay at TS `0.9.0` and `npx usemcpkit` finds no binary on musl. The glibc server also needs WebKitGTK installed to
  start at all, even when no window is opened.
- Decide whether the first release also ships the runner as `package/bin/mcpkit[.exe]`, so TS `0.9.0` installs update
  themselves into it, or whether those users reinstall with `npx usemcpkit` (see "Moving users from the `mcpkit` name").
- Homebrew and winget packages must ship `usemcpkit-servers` next to `usemcpkit`.

## Testing hazards

- The upgrade schedule is per user, not per `USEMCPKIT_HOME`: on Windows it is the Task Scheduler task "usemcpkit upgrade",
  elsewhere a launch agent or crontab line. Running `install`, `uninstall` or `serve` from the installed binary by
  hand, even with a sandboxed home, creates or deletes the real job. `USEMCPKIT_AUTO_UPDATE=0` stops it from being created,
  not from being removed. The tests only build the scheduler commands and never run them.
- When you mutation-check a test, restore the file in a way that gives it a new modification time. Cargo otherwise
  keeps the mutated build.
