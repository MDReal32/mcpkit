import { defineTool } from "@usemcpkit/core";

export const usersUsersGetSshSigningKeyForAuthenticatedUser = defineTool({
  name: "users:users:get_ssh_signing_key_for_authenticated_user",
  description: "Get an SSH signing key for the authenticated user. Gets extended details for an SSH signing key.",
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
    method: "GET",
    path: "/user/ssh_signing_keys/{ssh_signing_key_id}",
  },
});
