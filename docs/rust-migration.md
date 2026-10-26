# Rust migration plan (later)

Why: the Bun-compiled binary is about 113 MB on Windows because it embeds the Bun runtime. A Rust binary would be a few MB.
Not started; accepted size for now.

## Scope

- Servers (`packages/servers`), the generators, `packages/ui` and the `@usemcpkit/core` authoring API (`defineServer`,
  `defineTool`, `defineUI`) stay in TypeScript. Manifests (JSON) are the contract between the two sides.
- The `mcpkit` CLI and everything that runs inside the binary moves to Rust. The standalone binary is plain Rust and
  needs no Node. napi-rs is only for `@usemcpkit/core` on npm, to share validation and execution with Rust.

## Layout

```
crates/core         manifest types + validation, executor, response mapping, editions
crates/auth         fallbacks, OAuth PKCE, secrets and tokens files
crates/registry     index sync, checksum checks, lazy part downloads
crates/clients      client detection + JSONC/TOML config editing
crates/credentials  loopback credentials server, embeds packages/ui's HTML
crates/mcp          stdio server, the four meta-tools, supervisor
crates/cli          the `mcpkit` binary
crates/napi         napi-rs wrapper over core/auth for @usemcpkit/core
```

## Order

1. `core` (executor), 2. `registry` + `mcp` + `cli` for a working `serve`, 3. `auth` + `credentials`, 4. `clients`,
5. self-update and the supervisor, 6. `napi`.

## Notes

- Generate a JSON Schema from the manifest types so the TS and Rust validators cannot drift apart.
- Port behavior from the existing TS tests.
- Release pipeline: `cargo build --release` per target (`cargo-zigbuild` or a CI matrix for Linux musl/ARM) replaces
  `bun build --compile`; npm platform packages and the winget/Homebrew assets keep the same names.
- Open: keep it in this repo under `crates/` (preferred) or a separate repository; decide the registry format first
  (per-tool files, see the unfinished change in the working tree) so it is implemented once.
