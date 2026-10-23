import { defineTool } from "@usemcpkit/core";

export const usersUsersDeleteUserEmails = defineTool({
  name: "users:users:delete_user_emails",
  description:
    "Delete an email address. Deletes the specified email address. You cannot delete a primary email address. Any future emails sent to the deleted email address are sent to the primary email address instead.",
  input: {
    type: "object",
    properties: {
      email_id: {
        type: "integer",
        description: "ID of the email.",
      },
    },
    required: ["email_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/emails/{email_id}",
  },
});
