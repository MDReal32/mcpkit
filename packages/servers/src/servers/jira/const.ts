import type { Manifest, OpenApiSource } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const JIRA_FILE_PART_NAME = "file";

/** The Data Center releases Atlassian publishes a description for, by version, with the number its file is named by. */
export const JIRA_DATA_CENTER_SPECS: Readonly<Record<string, string>> = {
  "10.0": "10000",
  "10.1": "10001",
  "10.2": "10002",
  "10.3": "10003",
  "10.4": "10004",
  "10.5": "10005",
  "10.6": "10006",
  "10.7": "10007",
  "11.0": "11000",
  "11.1": "11001",
  "11.2": "11002",
  "11.3": "11003",
};

/**
 * Cloud from the platform (`/rest/api/2`, plain-text fields where v3 wants Atlassian Document Format) and Jira Software
 * descriptions, without the endpoints only Connect and Forge apps or development-tool integrations can call; Data Center
 * from the description of the release it runs.
 */
export const JIRA_SOURCES: OpenApiSource[] = [
  {
    name: "cloud",
    label: "Cloud",
    hosts: [".atlassian.net"],
    url: "https://developer.atlassian.com/cloud/jira/platform/swagger.v3.json",
    options: {
      filePartName: JIRA_FILE_PART_NAME,
      skip: ["^\\w+ /rest/(atlassian-connect|forge|internal)/"],
    },
  },
  {
    name: "cloud-software",
    label: "Cloud (Jira Software)",
    hosts: [".atlassian.net"],
    url: "https://developer.atlassian.com/cloud/jira/software/swagger.v3.json",
    options: {
      skip: ["^\\w+ /rest/(builds|deployments|devinfo|devopscomponents|featureflags|operations|remotelinks|security)/"],
    },
  },
  {
    name: "datacenter",
    label: "Data Center",
    url: "https://dac-static.atlassian.com/server/jira/platform/jira_software_dc_{version}_swagger.v3.json",
    version: {
      probe: { path: "/rest/api/2/serverInfo", field: "version", match: "^(\\d+\\.\\d+)" },
      env: "JIRA_VERSION",
      known: JIRA_DATA_CENTER_SPECS,
    },
    options: {
      filePartName: JIRA_FILE_PART_NAME,
      skip: ["^\\w+ /rest/auth/"],
    },
  },
];

export const JIRA_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "atlassian",
  version: "1.0.0",
  baseUrl: "https://{domain}",
  domain: {
    label: "Jira host (Cloud: <site>.atlassian.net, Data Center: <host>[/<context>])",
    env: "JIRA_HOST",
    check: true,
  },
  headers: { Accept: "application/json", "X-Atlassian-Token": "no-check" },
  auth: [
    {
      type: "basic",
      usernameEnv: "JIRA_USERNAME",
      passwordEnv: "JIRA_API_TOKEN",
      label: "Cloud: email + API token",
      applies: { sources: ["cloud", "cloud-software"] },
      ui: defineUI({
        inputs: {
          JIRA_USERNAME: { label: "Email", placeholder: "you@company.com" },
          JIRA_API_TOKEN: {
            label: "API token",
            hint: "Create it on id.atlassian.com; or set the JIRA_API_TOKEN environment variable.",
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
      env: "JIRA_PERSONAL_TOKEN",
      label: "Data Center: personal access token",
      applies: { sources: ["datacenter"], from: "8.14" },
      ui: defineUI({
        inputs: {
          JIRA_PERSONAL_TOKEN: { label: "Personal access token", placeholder: "Paste the token" },
        },
        actions: [
          {
            type: "link",
            label: "Create a personal access token ↗",
            url: "https://{domain}/secure/ViewProfile.jspa?selectedTab=com.atlassian.pats.pats-plugin:jira-user-personal-access-tokens",
          },
        ],
      }),
    },
  ],
};
