import type { Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const CLICKUP_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "productivity",
  version: "1.0.0",
  baseUrl: "https://api.clickup.com/api",
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
