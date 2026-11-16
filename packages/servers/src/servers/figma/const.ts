import type { Manifest, OpenApiSource } from "@usemcpkit/core";
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

/** Figma's description at a pinned commit; the endpoints a personal access token cannot call are left out. */
export const FIGMA_SOURCES: OpenApiSource[] = [
  {
    name: "rest",
    url: "https://raw.githubusercontent.com/figma/rest-api-spec/af027cd20aca8326a41115e4d15bbdf875158e81/openapi/openapi.yaml",
    sha256: "490cc17e98f72b8e5eff8f3cfcf8df2e059a67d89993c607761c2e9d6234fb7f",
    options: { security: ["PersonalAccessToken"] },
  },
];

export const FIGMA_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "design",
  version: "1.0.0",
  baseUrl: "https://api.figma.com",
  headers: { Accept: "application/json" },
  auth: [
    { type: "header", name: "X-Figma-Token", env: FIGMA_TOKEN_ENV, label: "Personal access token", ui: FIGMA_TOKEN_UI },
  ],
};
