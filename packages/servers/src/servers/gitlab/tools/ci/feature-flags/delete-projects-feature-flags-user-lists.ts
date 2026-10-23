import { defineTool } from "@usemcpkit/core";

export const ciFeatureFlagsDeleteProjectsFeatureFlagsUserLists = defineTool({
  name: "ci:feature_flags:delete_projects_feature_flags_user_lists",
  description: "Delete feature flag user list. Deletes a specified feature flag user list.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      iid: {
        type: "string",
        description: "Internal ID of the project's feature flag user list.",
      },
    },
    required: ["id", "iid"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/feature_flags_user_lists/{iid}",
  },
});
