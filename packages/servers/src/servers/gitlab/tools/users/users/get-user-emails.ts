import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUserEmails = defineTool({
  name: "users:users:get_user_emails",
  description:
    "Retrieve details on an email address. Retrieves details on a specified email address for the currently authenticated user.",
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
    method: "GET",
    path: "/user/emails/{email_id}",
  },
});
