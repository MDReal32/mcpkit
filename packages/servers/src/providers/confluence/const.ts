import type { Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const CONFLUENCE_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "atlassian",
  version: "1.0.0",
  baseUrl: "https://{domain}",
  domain: {
    label: "Confluence host (Cloud: <site>.atlassian.net, Data Center: <host>[/<context>])",
    env: "CONFLUENCE_HOST",
  },
  editions: {
    cloud: { label: "Cloud", hosts: [".atlassian.net"] },
  },
  headers: { Accept: "application/json", "X-Atlassian-Token": "no-check" },
  auth: [
    {
      type: "basic",
      usernameEnv: "CONFLUENCE_USERNAME",
      passwordEnv: "CONFLUENCE_API_TOKEN",
      label: "Cloud: email + API token",
      ui: defineUI({
        inputs: {
          CONFLUENCE_USERNAME: { label: "Email", placeholder: "you@company.com" },
          CONFLUENCE_API_TOKEN: {
            label: "API token",
            hint: "Create it on id.atlassian.com; or set the CONFLUENCE_API_TOKEN environment variable.",
          },
        },
        actions: [
          {
            type: "link",
            label: "Create on Atlassian ↗",
            url: "https://id.atlassian.com/manage-profile/security/api-tokens",
          },
        ],
      }),
    },
    {
      type: "bearer",
      env: "CONFLUENCE_PERSONAL_TOKEN",
      label: "Data Center: personal access token",
      ui: defineUI({
        inputs: {
          CONFLUENCE_PERSONAL_TOKEN: { label: "Personal access token", placeholder: "Paste the token" },
        },
        actions: [
          {
            type: "link",
            label: "Create a personal access token ↗",
            url: "https://{domain}/plugins/personalaccesstokens/usertokens.action",
          },
        ],
      }),
    },
  ],
};
