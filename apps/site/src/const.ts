import type { ClientName } from "./types/client-name";
import type { Feature } from "./types/feature";

export const INSTALL_COMMAND = "npx usemcpkit";

export const REPOSITORY_URL = "https://github.com/MDReal32/mcpkit";

export const NPM_URL = "https://www.npmjs.com/package/usemcpkit";

/** The registry's root index, which every deploy of the GitHub Pages site rewrites from the current build. */
export const REGISTRY_INDEX_URL = "https://mdreal32.github.io/mcpkit/index.json";

/** Rendered by `apps/video` and copied into the site's `build/video` by the deploy workflow. */
export const PROMO_VIDEO_URL = "/video/usemcpkit.mp4";

export const PROMO_POSTER_URL = "/video/poster.jpg";

/** The display names of `crates/clients/src/definitions`, one per client install can set up. */
export const SUPPORTED_CLIENTS: readonly ClientName[] = [
  { id: "claude-code", name: "Claude Code" },
  { id: "claude-desktop", name: "Claude Desktop" },
  { id: "cursor", name: "Cursor" },
  { id: "vscode", name: "VS Code" },
  { id: "vscode-insiders", name: "VS Code Insiders" },
  { id: "devin-desktop", name: "Windsurf" },
  { id: "cline", name: "Cline" },
  { id: "roo-code", name: "Roo Code" },
  { id: "copilot-cli", name: "GitHub Copilot CLI" },
  { id: "codex", name: "OpenAI Codex" },
  { id: "gemini-cli", name: "Gemini CLI" },
  { id: "zed", name: "Zed" },
  { id: "opencode", name: "opencode" },
  { id: "kiro", name: "Kiro" },
  { id: "lm-studio", name: "LM Studio" },
  { id: "junie", name: "JetBrains Junie" },
  { id: "warp", name: "Warp" },
];

export const TOOL_COUNT_LABEL = "4,700+";

export const FEATURES: readonly Feature[] = [
  {
    title: "Your AI stays sharp",
    body: "Thousands of actions can slow an AI down. usemcpkit shows it only what it needs, when it needs it, so answers stay quick and on point.",
  },
  {
    title: "Your keys stay yours",
    body: "Sign-ins and tokens are stored on your own computer. Nothing is sent through a service of ours.",
  },
  {
    title: "In your control",
    body: "Your AI can only use the apps you connected, with the access you gave it. You can cancel any sign-in request.",
  },
  {
    title: "Official servers too",
    body: "When a company runs its own AI server, like Cloudflare or Postman, usemcpkit connects to it for you.",
  },
  {
    title: "Always up to date",
    body: "New apps and fixes arrive automatically, with no restart and nothing to reinstall.",
  },
  {
    title: "Free and open source",
    body: "MIT licensed. The code is public, so you can see exactly what runs on your machine.",
  },
];
