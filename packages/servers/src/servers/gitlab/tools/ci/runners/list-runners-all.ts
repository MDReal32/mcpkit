import { defineTool } from "@usemcpkit/core";

export const ciRunnersListRunnersAll = defineTool({
  name: "ci:runners:list_runners_all",
  description:
    "List all runners. Lists all runners in the GitLab instance (project and shared). You must have either administrator access or auditor access.",
  input: {
    type: "object",
    properties: {
      scope: {
        type: "string",
        enum: [
          "specific",
          "shared",
          "instance_type",
          "group_type",
          "project_type",
          "active",
          "paused",
          "online",
          "offline",
          "never_contacted",
          "stale",
        ],
        description: "Scope of runners to return. Deprecated. Use `type` or `status` instead.",
      },
      type: {
        type: "string",
        enum: ["instance_type", "group_type", "project_type"],
        description: "Type of runners to return.",
      },
      paused: {
        type: "boolean",
        description:
          "If `true`, returns only runners that are ignoring new jobs. If `false`, returns only runners that are accepting new jobs.",
      },
      status: {
        type: "string",
        enum: ["active", "paused", "online", "offline", "never_contacted", "stale"],
        description: "Status of runners to return.",
      },
      tag_list: {
        type: "string",
        description: "List of runner tags. (comma-separated)",
      },
      version_prefix: {
        type: "string",
        description: "Version prefix of runners to return.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/runners/all",
    query: ["scope", "type", "paused", "status", "tag_list", "version_prefix", "page", "per_page"],
    commaQuery: ["tag_list"],
  },
});
