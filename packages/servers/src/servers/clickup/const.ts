import type { Manifest, OpenApiSource } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

/** ClickUp's v2 and v3 descriptions; the OAuth code exchange is left out, it needs the app's client secret. */
export const CLICKUP_SOURCES: OpenApiSource[] = [
  {
    name: "v2",
    url: "https://developer.clickup.com/openapi/clickup-api-v2-reference.json",
    options: {
      keepsExplodedArrays: true,
      skip: ["^POST /api/v2/oauth/token$"],
    },
  },
  {
    name: "v3",
    url: "https://developer.clickup.com/openapi/ClickUp_PUBLIC_API_V3.yaml",
    options: { keepsExplodedArrays: true },
  },
];

export const CLICKUP_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "productivity",
  version: "1.0.0",
  baseUrl: "https://api.clickup.com",
  headers: { Accept: "application/json" },
  auth: [
    {
      type: "header",
      name: "Authorization",
      env: "CLICKUP_API_TOKEN",
      label: "Personal API token",
      ui: defineUI({
        inputs: {
          CLICKUP_API_TOKEN: {
            label: "Personal API token",
            placeholder: "pk_…",
            hint: "Generate it under Settings → Apps in ClickUp; or set the CLICKUP_API_TOKEN environment variable.",
          },
        },
        actions: [
          {
            type: "link",
            label: "Create on ClickUp ↗",
            url: "https://app.clickup.com/settings/apps",
          },
        ],
      }),
    },
  ],
};
