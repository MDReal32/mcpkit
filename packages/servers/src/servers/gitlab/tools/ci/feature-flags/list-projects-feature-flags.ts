import { defineTool } from "@usemcpkit/core";

export const ciFeatureFlagsListProjectsFeatureFlags = defineTool({
  name: "ci:feature_flags:list_projects_feature_flags",
  description:
    "List all feature flags for a project. Lists all feature flags of the requested project. Use the `page` and `per_page` pagination parameters to control the pagination of results.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      scope: {
        type: "string",
        enum: ["enabled", "disabled"],
        description: "Filter feature flags by condition.",
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
    path: "/projects/{id}/feature_flags",
    query: ["scope", "page", "per_page"],
  },
});
