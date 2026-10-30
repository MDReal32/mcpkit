import { DEFAULT_SCHEMA_OPTIONS } from "../../utils/schema/const";
import type { EditionPair } from "./types/edition-pair";
import type { OperationNameOverride } from "./types/operation-name-override";
import type { SpecSource } from "./types/spec-source";

/**
 * Jira Cloud publishes the platform API twice, once per REST version. The v2 document is generated because
 * `/rest/api/2` is the one path every Jira Cloud site and every Data Center / Server release serves, and v2 takes plain
 * strings (wiki markup) where v3 demands Atlassian Document Format.
 */
export const SPEC_SOURCES: SpecSource[] = [
  {
    name: "platform",
    url: "https://developer.atlassian.com/cloud/jira/platform/swagger.v3.json",
    pathPrefix: "/rest/api/2/",
  },
  {
    name: "software",
    url: "https://developer.atlassian.com/cloud/jira/software/swagger.v3.json",
    pathPrefix: "/rest/agile/1.0/",
    group: "software",
  },
];

/**
 * Atlassian replaced the offset-paged JQL search on Cloud, while Data Center keeps it. One tool carries both: the
 * Data Center request is the default and the `cloud` edition takes the new endpoint.
 */
export const EDITION_PAIRS: EditionPair[] = [
  { cloud: "searchAndReconsileIssuesUsingJql", dataCenter: "searchForIssuesUsingJql" },
  { cloud: "searchAndReconsileIssuesUsingJqlPost", dataCenter: "searchForIssuesUsingJqlPost" },
];

export const SCHEMA_OPTIONS = DEFAULT_SCHEMA_OPTIONS;

export const CLOUD_EDITION = "cloud";

export const CLOUD_ONLY_SUFFIX = "(Jira Cloud only)";

export const DATA_CENTER_ONLY_SUFFIX = "(Data Center only)";

export const UNTAGGED_CATEGORY = "other";

export const SERVER_GROUPS = [
  {
    name: "issues",
    categories: [
      "Issues",
      "Issue comments",
      "Issue comment properties",
      "Issue attachments",
      "Issue watchers",
      "Issue votes",
      "Issue worklogs",
      "Issue worklog properties",
      "Issue links",
      "Issue link types",
      "Issue remote links",
      "Issue properties",
      "Issue redaction",
      "Issue bulk operations",
      "Issue search",
      "Issue navigator settings",
      "JQL",
      "JQL functions (apps)",
      "Jira expressions",
      "Labels",
      "Time tracking",
      "Tasks",
      UNTAGGED_CATEGORY,
    ],
  },
  {
    name: "projects",
    categories: [
      "Projects",
      "Project components",
      "Project versions",
      "Project categories",
      "Project roles",
      "Project role actors",
      "Project properties",
      "Project avatars",
      "Project features",
      "Project email",
      "Project key and name validation",
      "Project templates",
      "Project types",
      "Project classification levels",
      "Project permission schemes",
      "Classification levels",
    ],
  },
  {
    name: "users",
    categories: [
      "Users",
      "User search",
      "User properties",
      "Myself",
      "Groups",
      "Group and user picker",
      "Avatars",
      "Application roles",
      "Permissions",
      "Permission schemes",
    ],
  },
  {
    name: "workflows",
    categories: [
      "Workflows",
      "Workflow schemes",
      "Workflow scheme drafts",
      "Workflow scheme project associations",
      "Workflow transition rules",
      "Workflow statuses",
      "Workflow status categories",
      "Status",
      "Issue types",
      "Issue type properties",
      "Issue type schemes",
      "Issue type screen schemes",
      "Issue priorities",
      "Priority schemes",
      "Issue resolutions",
    ],
  },
  {
    name: "fields",
    categories: [
      "Issue fields",
      "Issue custom field contexts",
      "Issue custom field options",
      "Issue custom field associations",
      "Field schemes",
      "Issue field configurations",
      "Screens",
      "Screen tabs",
      "Screen tab fields",
      "Screen schemes",
      "Issue security schemes",
      "Issue security level",
      "Issue notification schemes",
    ],
  },
  {
    name: "collaboration",
    categories: ["Dashboards", "Filters", "Filter sharing", "Plans", "Teams in plan", "Webhooks"],
  },
  {
    name: "administration",
    categories: [
      "Jira settings",
      "Server info",
      "License metrics",
      "Audit records",
      "Announcement banner",
      "Policies",
      "Issue panels",
    ],
  },
  {
    name: "apps",
    categories: [
      "App properties",
      "App data policies",
      "App migration",
      "Dynamic modules",
      "Migration of Connect modules to Forge",
      "Service Registry",
      "UI modifications (apps)",
      "Issue custom field configuration (apps)",
      "Issue custom field values (apps)",
      "Issue custom field options (apps)",
    ],
  },
  {
    name: "software",
    categories: ["Backlog", "Board", "Epic", "Issue", "Sprint"],
  },
];

export const SERVER_NAME = "jira";

export const SERVER_DESCRIPTION =
  "Jira REST API (Cloud and Data Center): issues, projects, users, workflows, fields, dashboards and filters, administration, apps and Jira Software boards and sprints. Tools are named '<group>:<resource>:<action>' and use the /rest/api/2 endpoints (Jira Software: /rest/agile/1.0), so endpoints that exist only on Cloud fail on Data Center. Issue search picks the endpoint of the deployment.";

export const DOWNLOAD_PATHS: readonly RegExp[] = [/\/attachment\/(content|thumbnail)\/\{id\}$/];

export const FILE_PART_NAME = "file";

/**
 * Atlassian names the metadata operations after what they are used for (`getCreateIssueMeta`), which reads as two verbs
 * in a row ("get create"). They are filed under the metadata they return, with the verb alone leading the action.
 */
export const OPERATION_NAME_OVERRIDES: Readonly<Record<string, OperationNameOverride>> = {
  getCreateIssueMeta: { resource: "create-meta", action: "get" },
  getCreateIssueMetaIssueTypes: { resource: "create-meta", action: "list-issue-types" },
  getCreateIssueMetaIssueTypeId: { resource: "create-meta", action: "list-issue-type-fields" },
  getEditIssueMeta: { resource: "edit-meta", action: "get" },
};
