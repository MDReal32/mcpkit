import { defineTool } from "@usemcpkit/core";

export const usersUsersDeleteSshSigningKeyForAuthenticatedUser = defineTool({
  name: "users:users:delete_ssh_signing_key_for_authenticated_user",
  description:
    "Delete an SSH signing key for the authenticated user. Deletes an SSH signing key from the authenticated user's GitHub account.",
  input: {
    type: "object",
    properties: {
      ssh_signing_key_id: {
        type: "integer",
        description: "The unique identifier of the SSH signing key.",
      },
    },
    required: ["ssh_signing_key_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/ssh_signing_keys/{ssh_signing_key_id}",
  },
});
