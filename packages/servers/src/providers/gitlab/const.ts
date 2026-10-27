import type { Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const GITLAB_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "git",
  version: "1.0.0",
  baseUrl: "https://{domain}/api/v4",
  domain: {
    label: "GitLab host (self-managed: <host>[/<relative url root>])",
    default: "gitlab.com",
    env: "GITLAB_HOST",
    matchGitRemote: true,
  },
  headers: { Accept: "application/json" },
  auth: [
    {
      type: "bearer",
      env: "GITLAB_TOKEN",
      ui: defineUI({
        inputs: {
          GITLAB_TOKEN: { label: "Personal access token", placeholder: "glpat-…" },
        },
        actions: [
          {
            type: "link",
            label: "Create on GitLab ↗",
            url: "https://{domain}/-/user_settings/personal_access_tokens?name=mcpkit+{server}&scopes=api",
          },
          {
            type: "cli",
            label: "Use GitLab CLI",
            command: "glab",
            args: ["config", "get", "token", "--host", "{webHost}"],
          },
        ],
      }),
    },
  ],
};
