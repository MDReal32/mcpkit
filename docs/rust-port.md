# Rust port

The `usemcpkit` binary was a Bun-compiled TypeScript CLI of about 113 MB. On branch `feat/rust` it is two Rust binaries:

- `usemcpkit`, the runner, is what clients start;
- `usemcpkit-server`, the MCP server, runs behind it.

The servers, their generators, `packages/ui` and the `@usemcpkit/core` authoring API stay in TypeScript. The built JSON
manifests and the built UI page are the contract between the two sides. The TypeScript CLI (`apps/cli` and the packages
it bundles) still exists. It is the reference the Rust code is tested against until the first Rust release replaces it.

## Layout

| Path                     | Crate                     | What it owns                                                                                                                                   |
| ------------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/runner`            | `usemcpkit-runner` (`usemcpkit`) | The commands (`install`, which a bare `usemcpkit` runs, plus `uninstall`, `list`, `update`, `upgrade` and `serve`) and the supervisor that owns the client's stdio and swaps the server when its binary changes. |
| `apps/server`            | `usemcpkit-server`           | `serve [servers...] --worker`, which runs the catalog, sections and tool calls over stdio, and `window <url>`, the wry/tao credentials window. `build.rs` embeds `packages/ui/build/usemcpkit.ui.html`. |
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

The Nx targets of `@usemcpkit/runner` and `@usemcpkit/server` call `cargo`, so `cargo` has to be on PATH.

## Parity with the TypeScript CLI

**Goldens.** Each golden fixture is written by a TypeScript generator test, and a Rust test compares against it. A
generator is skipped unless its variable is set. Regenerate the goldens when the registry or the TS behavior changes, and
pass absolute paths.

| Fixture                                                      | Rust test                                   | Regenerate (from)                                                                                                                  |
| ------------------------------------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `apps/server/tests/fixtures/exposed-tools.json`              | `exposed_tools.rs`                          | `apps/cli`: `GOLDEN_OUTPUT=<file> yarn vitest run --configLoader runner test/exposure-golden.generate.test.ts`                      |
| `apps/server/tests/fixtures/session.json`, `tool-digests.json` | `session_parity.rs`                       | `apps/cli`: `SESSION_GOLDEN_OUTPUT=<fixtures dir> yarn vitest run --configLoader runner test/session-golden.generate.test.ts`        |
| `apps/server/tests/fixtures/upstream-naming.json`            | `upstream_naming.rs`                        | `apps/cli`: `UPSTREAM_NAMING_GOLDEN_OUTPUT=<file> yarn vitest run --configLoader runner test/upstream-naming-golden.generate.test.ts` |
| `crates/execution/tests/fixtures/requests.json`              | `request_golden.rs`                         | `packages/core`: `REQUEST_GOLDEN_OUTPUT=<file> yarn vitest run --configLoader native test/request-golden.generate.test.ts`            |
| `crates/execution/tests/fixtures/teams-forwarded-credentials.json` | `upstream_access.rs`                  | `packages/core`: `FORWARDED_GOLDEN_OUTPUT=<file> yarn vitest run --configLoader native test/forwarded-credentials-golden.generate.test.ts` |
| `crates/auth/tests/fixtures/credentials-form.golden.json`    | `credentials_golden.rs`                     | `packages/core`: `CREDENTIAL_GOLDEN_OUTPUT=<file> yarn vitest run --configLoader native test/credential-golden.generate.test.ts`      |
| `crates/clients/tests/fixtures/config-edits.json`            | `config_edits.rs`                           | `packages/clients`: `CONFIG_EDITS_GOLDEN_OUTPUT=<file> yarn vitest run --configLoader native test/config-edits-golden.generate.test.ts` |

The credentials golden is not named `credentials.json` because `.gitignore` ignores every file with that name.

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
- `validateManifest` (semantic validation) is not ported. serde checks structure only, and `validate` is not a runner
  command.

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
- The napi-rs wrapper for `@usemcpkit/core` that the first plan listed.

## Moving users from the TypeScript binary

- A TS supervisor that is already running restarts whatever binary replaced its own as `serve <names> --worker`. The
  runner accepts that hidden flag and hands the connection on to `usemcpkit-server` on the same stdio.
- The TS updater replaces only the runner. When the installed runner finds no `usemcpkit-server` next to it, it downloads
  the server of its own version from npm (`restore_server_binary`) before serving.

## Moving users from the `mcpkit` name

Releases up to TS `0.9.0` were named `mcpkit`: the command `mcpkit`, the home `~/.mcpkit`, the client entry `mcpkit`
and the scheduled job "mcpkit upgrade" (launchd `org.mdreal.mcpkit.upgrade`, cron marker `# mcpkit: scheduled upgrade`).
TS and Rust handle them the same way:

- Installing writes the `usemcpkit` entry and drops a `mcpkit` one from the same config, so the client never starts
  both; uninstalling removes both. A client with only the old entry counts as configured (`LEGACY_ENTRY_NAMES`).
- Every update of the upgrade schedule also removes the old job, so it stops upgrading the old binary; uninstalling
  removes both.
- `serve` (the worker) copies `config.json`, `secrets.json` and `tokens.json` from `~/.mcpkit` into `~/.usemcpkit`
  once, while the new home has none of them (`adopt_legacy_home`). It never does with `USEMCPKIT_HOME` set, and it
  leaves the old folder alone. Caches, cloned repos and logs are not copied: they come back on first use.
- An installed TS `0.9.0` updates itself from `package/bin/mcpkit[.exe]` of the platform package and knows nothing of
  the new names. Until a release ships that path too, those installs stay on `0.9.0`, and `npx usemcpkit` moves them
  over once.

## Release work still open

- `apps/cli/plugins/binaries` still compiles the TS CLI with Bun. Replace it with a `cargo build --release` per target
  (`cargo-zigbuild` or a CI matrix for Linux musl and ARM).
- Each npm platform package must ship `package/bin/usemcpkit[.exe]` and `package/bin/usemcpkit-server[.exe]` together.
- Decide whether the first release also ships the runner as `package/bin/mcpkit[.exe]`, so TS `0.9.0` installs update
  themselves into it, or whether those users reinstall with `npx usemcpkit` (see "Moving users from the `mcpkit` name").
- npm already has a TS `0.9.0`, which has no server in it, so the first Rust release must be newer than `0.9.0`.
- Homebrew and winget packages must ship `usemcpkit-server` next to `usemcpkit`.
- The `usemcpkit` npx wrapper must spawn the platform binary instead of the TS CLI.

## Testing hazards

- The upgrade schedule is per user, not per `USEMCPKIT_HOME`: on Windows it is the Task Scheduler task "usemcpkit upgrade",
  elsewhere a launch agent or crontab line. Running `install`, `uninstall` or `serve` from the installed binary by
  hand, even with a sandboxed home, creates or deletes the real job. `USEMCPKIT_AUTO_UPDATE=0` stops it from being created,
  not from being removed. The tests only build the scheduler commands and never run them.
- When you mutation-check a test, restore the file in a way that gives it a new modification time. Cargo otherwise
  keeps the mutated build.
