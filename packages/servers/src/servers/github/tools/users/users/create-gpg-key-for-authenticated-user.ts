import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateGpgKeyForAuthenticatedUser = defineTool({
  name: "users:users:create_gpg_key_for_authenticated_user",
  description:
    "Create a GPG key for the authenticated user. Adds a GPG key to the authenticated user's GitHub account.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "A descriptive name for the new key.",
      },
      armored_public_key: {
        type: "string",
        description: "A GPG key in ASCII-armored format.",
      },
    },
    required: ["armored_public_key"],
  },
  request: {
    method: "POST",
    path: "/user/gpg_keys",
    body: ["name", "armored_public_key"],
  },
});
