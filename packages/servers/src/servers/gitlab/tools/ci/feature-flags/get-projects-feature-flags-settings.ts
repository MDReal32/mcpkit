import { defineTool } from "@usemcpkit/core";

export const ciFeatureFlagsGetProjectsFeatureFlagsSettings = defineTool({
  name: "ci:feature_flags:get_projects_feature_flags_settings",
  description: "Retrieve feature flag settings. Retrieves the feature flag settings of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/feature_flags_settings",
  },
});
