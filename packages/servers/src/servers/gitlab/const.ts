import type { Manifest, OpenApiSource } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

/**
 * gitlab.com from the OpenAPI 3 description of a pinned commit; a self-managed instance from the Swagger 2.0 one of
 * the release tag it runs, which every release has.
 */
export const GITLAB_SOURCES: OpenApiSource[] = [
  {
    name: "dotcom",
    label: "GitLab.com",
    hosts: ["gitlab.com"],
    url: "https://gitlab.com/gitlab-org/gitlab/-/raw/c04b7baaaf626af73eba019d45e7e58e8fc59376/doc/api/openapi/openapi_v3.yaml",
    sha256: "21344c50eed9a6f47bbf470c2ebc615c2591b3c3ac7061c83b0023ef0ebd5b61",
  },
  {
    name: "self-managed",
    label: "Self-managed",
    url: "https://gitlab.com/gitlab-org/gitlab/-/raw/v{version}-ee/doc/api/openapi/openapi_v2.yaml",
    version: {
      probe: { path: "/api/v4/version", field: "version", match: "^(\\d+\\.\\d+\\.\\d+)" },
      env: "GITLAB_VERSION",
    },
  },
];

export const GITLAB_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "git",
  version: "1.0.0",
  baseUrl: "https://{domain}",
  domain: {
    label: "GitLab host (self-managed: <host>[/<relative url root>])",
    default: "gitlab.com",
    env: "GITLAB_HOST",
    matchGitRemote: true,
    check: true,
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
            url: "https://{domain}/-/user_settings/personal_access_tokens?name=usemcpkit+{server}&scopes=api",
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
