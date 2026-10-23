import { defineTool } from "@usemcpkit/core";

export const ciFeatureFlagsCreateProjectsFeatureFlagsUserLists = defineTool({
  name: "ci:feature_flags:create_projects_feature_flags_user_lists",
  description: "Create a feature flag user list. Creates a feature flag user list in a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the list.",
      },
      user_xids: {
        type: "string",
        description: "Comma-separated list of external user IDs.",
      },
    },
    required: ["id", "name", "user_xids"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/feature_flags_user_lists",
    body: ["name", "user_xids"],
  },
});
