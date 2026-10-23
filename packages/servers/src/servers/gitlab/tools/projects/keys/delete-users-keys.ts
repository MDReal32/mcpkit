import { defineTool } from "@usemcpkit/core";

export const projectsKeysDeleteUsersKeys = defineTool({
  name: "projects:keys:delete_users_keys",
  description: "Delete an SSH key for a user. Deletes an SSH key from a specified user account. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
      key_id: {
        type: "integer",
        description: "ID of the SSH key.",
      },
    },
    required: ["id", "key_id"],
  },
  request: {
    method: "DELETE",
    path: "/users/{id}/keys/{key_id}",
  },
});
