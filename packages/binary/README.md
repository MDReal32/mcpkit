# @usemcpkit/binary

Installs and self-updates the mcpkit binary at `~/.mcpkit/bin/mcpkit`. Private; bundled into the CLI.

- `src/install/`: copy the running binary, install a given one (`--binary`), or download the platform package
  `@usemcpkit/cli-<target>` (for example `cli-darwin-arm64`, `cli-linux-x64-musl`) from npm at the same version and
  check the tarball against its published `sha512` integrity.
- `src/update/`, `src/release/`: the once-a-day background check against the npm registry and the replacement of the
  binary (`MCPKIT_AUTO_UPDATE=0` turns it off, `MCPKIT_NPM_REGISTRY` points at another registry).
- `src/platform/`: the build targets and npm package names, shared with the CLI's `plugins/binaries/` Vite plugin
  (which cross-compiles with Bun) and the runtime.
- `src/tar/`: reading the downloaded tarball.

Homebrew (`Cellar/mcpkit/<version>`) and winget (`WinGet\Packages\<id>_…`) installs are used in place and never copied
or updated by mcpkit.
