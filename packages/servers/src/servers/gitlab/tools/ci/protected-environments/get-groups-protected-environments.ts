import { defineTool } from "@usemcpkit/core";

export const ciProtectedEnvironmentsGetGroupsProtectedEnvironments = defineTool({
  name: "ci:protected_environments:get_groups_protected_environments",
  description: "Retrieve a protected environment for a group. Retrieves a specified protected environment for a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      name: {
        type: "string",
        enum: ["production", "staging", "testing", "development", "other"],
        description: "The deployment tier of the protected environment.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/protected_environments/{name}",
  },
});
