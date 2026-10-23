import { defineTool } from "@usemcpkit/core";

export const usersUsersDeleteGpgKeyForAuthenticatedUser = defineTool({
  name: "users:users:delete_gpg_key_for_authenticated_user",
  description:
    "Delete a GPG key for the authenticated user. Removes a GPG key from the authenticated user's GitHub account.",
  input: {
    type: "object",
    properties: {
      gpg_key_id: {
        type: "integer",
        description: "The unique identifier of the GPG key.",
      },
    },
    required: ["gpg_key_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/gpg_keys/{gpg_key_id}",
  },
});
