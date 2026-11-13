import type { Manifest, OpenApiSource } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const GITHUB_API_VERSION = "2022-11-28";

export const GITHUB_CLASSIC_SCOPES = [
  "repo",
  "workflow",
  "write:packages",
  "delete:packages",
  "admin:org",
  "admin:public_key",
  "admin:repo_hook",
  "admin:org_hook",
  "gist",
  "notifications",
  "user",
  "delete_repo",
  "write:discussion",
  "admin:enterprise",
  "audit_log",
  "codespace",
  "copilot",
  "project",
  "admin:gpg_key",
  "admin:ssh_signing_key",
];

export const GITHUB_DOTCOM_SPEC_URL =
  "https://raw.githubusercontent.com/github/rest-api-description/bd6df26d2a0104874fe5025a25ebcde356413364/descriptions/api.github.com/api.github.com.json";

export const GITHUB_DOTCOM_SPEC_SHA256 = "9416f1144aee15971790d0de5388e7ad88a6fdad759fdb729bf94b8414bfb57f";

export const GITHUB_DOWNLOAD_PATHS = ["/(zipball|tarball)/\\{ref\\}$"];

/** github.com from its pinned description; GitHub Enterprise Server from the description of the version it runs. */
export const GITHUB_SOURCES: OpenApiSource[] = [
  {
    name: "dotcom",
    label: "GitHub.com",
    hosts: ["api.github.com"],
    url: GITHUB_DOTCOM_SPEC_URL,
    sha256: GITHUB_DOTCOM_SPEC_SHA256,
    options: { downloadPaths: GITHUB_DOWNLOAD_PATHS },
  },
  {
    name: "enterprise",
    label: "Enterprise Server",
    url: "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/ghes-{version}/ghes-{version}.json",
    basePath: "",
    version: {
      probe: { path: "/meta", field: "installed_version", match: "^(\\d+\\.\\d+)" },
      env: "GITHUB_ENTERPRISE_VERSION",
      list: {
        url: "https://api.github.com/repos/github/rest-api-description/contents/descriptions",
        field: "name",
        match: "^ghes-(\\d+\\.\\d+)$",
      },
    },
    options: { downloadPaths: GITHUB_DOWNLOAD_PATHS },
  },
];

export const GITHUB_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "git",
  version: "1.0.0",
  baseUrl: "https://{domain}",
  domain: {
    label: "GitHub API host (GitHub Enterprise: <host>/api/v3)",
    default: "api.github.com",
    env: "GITHUB_API_HOST",
    matchGitRemote: true,
    check: true,
  },
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
    "User-Agent": "usemcpkit",
  },
  auth: [
    {
      type: "bearer",
      env: "GITHUB_TOKEN",
      ui: defineUI({
        inputs: {
          GITHUB_TOKEN: { label: "Access token", placeholder: "ghp_… or github_pat_…" },
        },
        actions: [
          {
            type: "link",
            label: "Create fine-grained token ↗",
            url: "https://{webHost}/settings/personal-access-tokens/new?name=usemcpkit+{server}&description=Used+by+usemcpkit",
          },
          {
            type: "link",
            label: "Create classic token ↗",
            url: `https://{webHost}/settings/tokens/new?description=usemcpkit+{server}&scopes=${GITHUB_CLASSIC_SCOPES.join(",")}`,
          },
          {
            type: "cli",
            label: "Use GitHub CLI",
            command: "gh",
            args: ["auth", "token", "--hostname", "{webHost}"],
          },
        ],
      }),
    },
  ],
};
