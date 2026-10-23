import { defineTool } from "@usemcpkit/core";

export const usersUsersDeleteUsersEmails = defineTool({
  name: "users:users:delete_users_emails",
  description:
    "Delete an email address for a user. Deletes a specified email address for a user account. You cannot delete a primary email address. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
      email_id: {
        type: "integer",
        description: "ID of the email.",
      },
    },
    required: ["id", "email_id"],
  },
  request: {
    method: "DELETE",
    path: "/users/{id}/emails/{email_id}",
  },
});
