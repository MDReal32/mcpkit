import type { DomainSpec, Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const N8N_API_KEY_ENV = "N8N_API_KEY";

/** n8n Cloud and a local n8n on its default port, offered in the host field; neither is picked by default. */
export const N8N_SUGGESTED_HOSTS = ["app.n8n.cloud", "localhost:5678"];

export const N8N_API_KEY_UI = defineUI({
  inputs: {
    [N8N_API_KEY_ENV]: {
      label: "API key",
      placeholder: "n8n API key",
      hint: "Create it in n8n under Settings → n8n API, with the scopes you want the AI to have (scopes need an enterprise plan; otherwise the key can do everything its user can). You can also set the N8N_API_KEY environment variable.",
    },
  },
  actions: [
    {
      type: "link",
      label: "Open the n8n API settings ↗",
      url: "https://{domain}/settings/api",
    },
    {
      type: "link",
      label: "API guide ↗",
      url: "https://docs.n8n.io/api/authentication/",
    },
  ],
});

/** The host of an n8n instance, shared by the REST API server and the instance-level MCP server. */
export const N8N_DOMAIN: DomainSpec = {
  label: "n8n host (n8n Cloud: <name>.app.n8n.cloud; self-hosted: <host>[:<port>][/<path>])",
  placeholder: "acme.app.n8n.cloud",
  env: "N8N_HOST",
  suggestedHosts: N8N_SUGGESTED_HOSTS,
  loopbackHttp: true,
};

export const N8N_CATEGORY = "automation";

export const N8N_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: N8N_CATEGORY,
  version: "1.0.0",
  baseUrl: "https://{domain}/api/v1",
  domain: N8N_DOMAIN,
  headers: { Accept: "application/json" },
  auth: [{ type: "header", name: "X-N8N-API-KEY", env: N8N_API_KEY_ENV, label: "API key", ui: N8N_API_KEY_UI }],
};
