import { defineTool } from "@usemcpkit/core";

export const ciFeatureFlagsUpdateProjectsFeatureFlagsSettings = defineTool({
  name: "ci:feature_flags:update_projects_feature_flags_settings",
  description: "Update feature flag settings. Updates the feature flag settings of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      minimum_role: {
        type: "string",
        description: "Minimum role required to create, update, toggle, and delete feature flags",
        enum: ["no_one_allowed", "developer", "maintainer", "owner"],
      },
    },
    required: ["id", "minimum_role"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/feature_flags_settings",
    body: ["minimum_role"],
  },
});
