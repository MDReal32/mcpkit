# @usemcpkit/clients

Detects the AI clients installed for the current user and edits their MCP configuration. Private; bundled into the CLI.

One definition per client in `src/definitions/<id>.ts` (config path, entry shape), listed in
`src/client-definitions.ts`. JSON configs are edited with `jsonc-parser` so comments and other keys stay; the Codex
TOML config is edited line by line. Only the `mcpkit` key is touched, and the previous file is kept as
`<config>.mcpkit-backup`.

Supported ids: `claude-desktop`, `claude-code` (`~/.claude.json`), `cursor`, `vscode`, `vscode-insiders` (`servers` in
the user `mcp.json`), `devin-desktop` (Windsurf's new home), `windsurf` (legacy `~/.codeium/windsurf`), `cline`
(`~/.cline`), `roo-code`, `copilot-cli`, `codex` (TOML), `gemini-cli`, `zed` (`context_servers`), `opencode` (`mcp`),
`kiro`, `lm-studio`, `junie`, `warp`. A client counts as installed when its config directory exists.

To add a client, add a definition file and list it in `client-definitions.ts`.
