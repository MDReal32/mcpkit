import { defineTool } from "@usemcpkit/core";

export const ciProtectedEnvironmentsDeleteGroupsProtectedEnvironments = defineTool({
  name: "ci:protected_environments:delete_groups_protected_environments",
  description: "Unprotect a group environment. Unprotects a specified protected environment for a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      name: {
        type: "string",
        description:
          "Deployment tier of the protected environment. Possible values are `production`, `staging`, `testing`, `development`, and `other`.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/protected_environments/{name}",
  },
});
