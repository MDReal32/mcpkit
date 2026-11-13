import type { ConversionOptions, Manifest, OpenApiSource } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const CONFLUENCE_OPTIONS: ConversionOptions = {
  maxDepth: 2,
  includeDefaults: false,
  stripBold: true,
  downloadPaths: ["/download$", "/thumbnail"],
};

/** The Data Center releases Atlassian publishes a description for, by version, with the release its file is named by. */
export const CONFLUENCE_DATA_CENTER_SPECS: Readonly<Record<string, string>> = {
  "9.0": "9.0.1",
  "9.2": "9.2.3",
  "9.3": "9.3.1",
  "9.4": "9.4.0",
  "9.5": "9.5.1",
  "10.0": "10.0.2",
  "10.1": "10.1.1",
  "10.2": "10.2.19",
  "11.0": "11.0.1",
  "11.1": "11.1.0",
};

/**
 * Cloud from its REST v2 and v1 descriptions; Data Center from the description of the release it runs, whose paths
 * sit right under the host (a context path belongs in the host).
 */
export const CONFLUENCE_SOURCES: OpenApiSource[] = [
  {
    name: "cloud",
    label: "Cloud",
    hosts: [".atlassian.net"],
    url: "https://dac-static.atlassian.com/cloud/confluence/openapi-v2.v3.json",
    options: CONFLUENCE_OPTIONS,
  },
  {
    name: "cloud-v1",
    label: "Cloud (REST v1)",
    hosts: [".atlassian.net"],
    url: "https://developer.atlassian.com/cloud/confluence/swagger.v3.json",
    options: CONFLUENCE_OPTIONS,
  },
  {
    name: "datacenter",
    label: "Data Center",
    url: "https://dac-static.atlassian.com/server/confluence/{version}.swagger.v3.json",
    basePath: "",
    version: {
      probe: { path: "/rest/api/server-information", field: "version", match: "^(\\d+\\.\\d+)" },
      env: "CONFLUENCE_VERSION",
      known: CONFLUENCE_DATA_CENTER_SPECS,
    },
    options: CONFLUENCE_OPTIONS,
  },
];

export const CONFLUENCE_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "atlassian",
  version: "1.0.0",
  baseUrl: "https://{domain}",
  domain: {
    label: "Confluence host (Cloud: <site>.atlassian.net, Data Center: <host>[/<context>])",
    env: "CONFLUENCE_HOST",
    check: true,
  },
  headers: { Accept: "application/json", "X-Atlassian-Token": "no-check" },
  auth: [
    {
      type: "basic",
      usernameEnv: "CONFLUENCE_USERNAME",
      passwordEnv: "CONFLUENCE_API_TOKEN",
      label: "Cloud: email + API token",
      applies: { sources: ["cloud", "cloud-v1"] },
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
      applies: { sources: ["datacenter"], if: "{version} >= 7.9" },
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
