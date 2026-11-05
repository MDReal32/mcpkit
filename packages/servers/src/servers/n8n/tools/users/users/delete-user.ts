import { defineTool } from "@usemcpkit/core";

export const usersUsersDeleteUser = defineTool({
  name: "users:users:delete_user",
  description: "Delete user. Delete a user from your instance.",
  input: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description: "The ID of the user.",
      },
      transferId: {
        type: "string",
        description:
          "ID of the project to transfer the deleted user's workflows and credentials to. Omit to delete those resources instead of transferring them.",
      },
    },
    required: ["userId"],
  },
  request: {
    method: "DELETE",
    path: "/users/{userId}",
    query: ["transferId"],
  },
});
