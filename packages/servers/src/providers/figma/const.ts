import type { Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const FIGMA_TOKEN_ENV = "FIGMA_ACCESS_TOKEN";

export const FIGMA_TOKEN_UI = defineUI({
  inputs: {
    [FIGMA_TOKEN_ENV]: {
      label: "Personal access token",
      placeholder: "figd_…",
      hint: "Generate it in Figma under Settings → Security → Personal access tokens, with the scopes you need (for example File content and Comments); or set the FIGMA_ACCESS_TOKEN environment variable.",
    },
  },
  actions: [
    {
      type: "link",
      label: "Open Figma settings ↗",
      url: "https://www.figma.com/settings",
    },
    {
      type: "link",
      label: "Token guide ↗",
      url: "https://developers.figma.com/docs/rest-api/authentication/#access-tokens",
    },
  ],
});

export const FIGMA_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "design",
  version: "1.0.0",
  baseUrl: "https://api.figma.com",
  headers: { Accept: "application/json" },
  auth: [
    { type: "header", name: "X-Figma-Token", env: FIGMA_TOKEN_ENV, label: "Personal access token", ui: FIGMA_TOKEN_UI },
  ],
};
