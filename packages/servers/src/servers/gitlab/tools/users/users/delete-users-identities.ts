import { defineTool } from "@usemcpkit/core";

export const usersUsersDeleteUsersIdentities = defineTool({
  name: "users:users:delete_users_identities",
  description:
    "Delete authentication identity from a user. Deletes a user authentication identity using the provider name associated with that identity. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
      provider: {
        type: "string",
        description: "Name of the external authentication provider.",
      },
    },
    required: ["id", "provider"],
  },
  request: {
    method: "DELETE",
    path: "/users/{id}/identities/{provider}",
  },
});
