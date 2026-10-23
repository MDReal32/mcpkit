import { defineTool } from "@usemcpkit/core";

export const usersUsersAddEmailForAuthenticatedUser = defineTool({
  name: "users:users:add_email_for_authenticated_user",
  description:
    "Add an email address for the authenticated user. OAuth app tokens and personal access tokens (classic) need the `user` scope to use this endpoint.",
  input: {
    type: "object",
    properties: {
      emails: {
        type: "array",
        description:
          "Adds one or more email addresses to your GitHub account. Must contain at least one email address. **Note:** Alternatively, you can pass a single email address or an `array` of emails addresses directly, but we recommend that you pass an object using the `emails` key.",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/user/emails",
    body: ["emails"],
  },
});
