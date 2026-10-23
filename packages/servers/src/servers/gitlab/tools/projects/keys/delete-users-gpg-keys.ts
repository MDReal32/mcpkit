import { defineTool } from "@usemcpkit/core";

export const projectsKeysDeleteUsersGpgKeys = defineTool({
  name: "projects:keys:delete_users_gpg_keys",
  description: "Delete a GPG key for a user. Deletes a GPG key from a specified user account. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
      key_id: {
        type: "integer",
        description: "ID of the GPG key.",
      },
    },
    required: ["id", "key_id"],
  },
  request: {
    method: "DELETE",
    path: "/users/{id}/gpg_keys/{key_id}",
  },
});
