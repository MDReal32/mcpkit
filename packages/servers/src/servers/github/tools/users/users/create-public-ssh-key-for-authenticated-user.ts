import { defineTool } from "@usemcpkit/core";

export const usersUsersCreatePublicSshKeyForAuthenticatedUser = defineTool({
  name: "users:users:create_public_ssh_key_for_authenticated_user",
  description:
    "Create a public SSH key for the authenticated user. Adds a public SSH key to the authenticated user's GitHub account.",
  input: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "A descriptive name for the new key.",
      },
      key: {
        type: "string",
        description: "The public SSH key to add to your GitHub account.",
      },
    },
    required: ["key"],
  },
  request: {
    method: "POST",
    path: "/user/keys",
    body: ["title", "key"],
  },
});
