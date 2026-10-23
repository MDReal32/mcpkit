import { defineTool } from "@usemcpkit/core";

export const ciFeatureFlagsGetProjectsFeatureFlags = defineTool({
  name: "ci:feature_flags:get_projects_feature_flags",
  description: "Retrieve a feature flag. Retrieves a specified feature flag.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      feature_flag_name: {
        type: "string",
        description: "Name of the feature flag.",
      },
    },
    required: ["id", "feature_flag_name"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/feature_flags/{feature_flag_name}",
  },
});
