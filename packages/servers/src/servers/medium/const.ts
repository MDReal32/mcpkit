import type { Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const MEDIUM_TOKEN_ENV = "MEDIUM_INTEGRATION_TOKEN";

export const MEDIUM_TOKEN_UI = defineUI({
  inputs: {
    [MEDIUM_TOKEN_ENV]: {
      label: "Integration token",
      placeholder: "Medium integration token",
      hint: "A self-issued integration token from your Medium settings (Security and apps → Integration tokens). Medium no longer issues new tokens, so this works only if you already have one. You can also set the MEDIUM_INTEGRATION_TOKEN environment variable.",
    },
  },
  actions: [
    {
      type: "link",
      label: "Medium security settings ↗",
      url: "https://medium.com/me/settings/security",
    },
    {
      type: "link",
      label: "API documentation ↗",
      url: "https://github.com/Medium/medium-api-docs",
    },
  ],
});

export const MEDIUM_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "communication",
  version: "1.0.0",
  baseUrl: "https://api.medium.com/v1",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "utf-8",
  },
  auth: [{ type: "bearer", env: MEDIUM_TOKEN_ENV, label: "Integration token", ui: MEDIUM_TOKEN_UI }],
};
