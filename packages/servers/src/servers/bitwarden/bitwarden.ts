import { defineServer } from "@usemcpkit/core";
import { BITWARDEN_NAMING, BITWARDEN_REPO_COMMIT, BITWARDEN_REPO_URL, BITWARDEN_SESSION_ENV } from "./const";

export const bitwarden = defineServer({
  name: "bitwarden",
  category: "security",
  version: "1.0.0",
  description:
    "Bitwarden password manager through its own MCP server (github.com/bitwarden/mcp-server), cloned on first use into ~/.mcpkit/repos/security/bitwarden, built there and run locally: vault items, folders, attachments, Send, password and TOTP tools. Needs git, Node.js and npm on PATH, the Bitwarden CLI (`bw`) for the vault tools, and an unlocked session in BW_SESSION (`bw unlock --raw`). It reads and changes real credentials, so allow only the tools you trust.",
  baseUrl: "https://bitwarden.com",
  upstream: {
    type: "stdio",
    command: "node",
    args: ["{repo}/dist/index.js"],
    forwardEnv: [BITWARDEN_SESSION_ENV],
    naming: BITWARDEN_NAMING,
    repo: {
      url: BITWARDEN_REPO_URL,
      ref: BITWARDEN_REPO_COMMIT,
      setup: [
        { command: "npm", args: ["ci", "--ignore-scripts"] },
        { command: "npm", args: ["run", "build"] },
      ],
    },
  },
  tools: [],
});
