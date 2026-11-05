import { defineTool } from "@usemcpkit/core";

export const usersRolesUpdateRole = defineTool({
  name: "users:roles:update_role",
  description:
    "Update a custom role. Replaces a custom role's display name, description, and scopes. System roles cannot be updated.",
  input: {
    type: "object",
    properties: {
      roleSlug: {
        type: "string",
        description: "The slug of the role.",
      },
      displayName: {
        type: "string",
      },
      description: {
        type: "string",
      },
      scopes: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["roleSlug", "displayName", "description", "scopes"],
  },
  request: {
    method: "PUT",
    path: "/roles/{roleSlug}",
    body: ["displayName", "description", "scopes"],
  },
});
