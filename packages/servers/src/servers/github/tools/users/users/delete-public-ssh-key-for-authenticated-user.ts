import { defineTool } from "@usemcpkit/core";

export const usersUsersDeletePublicSshKeyForAuthenticatedUser = defineTool({
  name: "users:users:delete_public_ssh_key_for_authenticated_user",
  description:
    "Delete a public SSH key for the authenticated user. Removes a public SSH key from the authenticated user's GitHub account.",
  input: {
    type: "object",
    properties: {
      key_id: {
        type: "integer",
        description: "The unique identifier of the key.",
      },
    },
    required: ["key_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/keys/{key_id}",
  },
});
