import { defineTool } from "@usemcpkit/core";

export const ciRunnersListProjectsRunners = defineTool({
  name: "ci:runners:list_projects_runners",
  description:
    "List all runners for a project. List all runners available in the project, including from ancestor groups and any allowed shared runners.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
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
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/runners",
    query: ["scope", "type", "paused", "status", "tag_list", "version_prefix", "page", "per_page"],
    commaQuery: ["tag_list"],
  },
});
