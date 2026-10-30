import type { UpstreamNameRule } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const CLOUDFLARE_MCP_URL = "https://mcp.cloudflare.com/mcp";

export const CLOUDFLARE_TOKEN_ENV = "CLOUDFLARE_API_TOKEN";

export const CLOUDFLARE_TOKEN_UI = defineUI({
  inputs: {
    [CLOUDFLARE_TOKEN_ENV]: {
      label: "API token",
      placeholder: "Cloudflare API token",
      hint: "A user or account API token with the permissions you want to give the AI; an account token also needs Account Resources: Read. Tokens with Client IP Address Filtering are not supported. You can also set the CLOUDFLARE_API_TOKEN environment variable.",
    },
  },
  actions: [
    {
      type: "link",
      label: "Create an API token ↗",
      url: "https://dash.cloudflare.com/profile/api-tokens",
    },
    {
      type: "link",
      label: "About this server ↗",
      url: "https://github.com/cloudflare/mcp",
    },
  ],
});

/**
 * Cloudflare's API server runs in code mode: `search` and `execute` take JavaScript that queries the OpenAPI spec and
 * calls the API, so a handful of tools covers every endpoint. These rules file them as `<group>:<resource>:<action>`.
 */
export const CLOUDFLARE_NAMING: readonly UpstreamNameRule[] = [
  { match: "^docs$", name: "docs:docs:search" },
  { match: "^search$", name: "api:spec:search" },
  { match: "^execute$", name: "api:requests:execute" },
  { match: "^whoami$", name: "account:account:whoami" },
];
