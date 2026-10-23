import { defineTool } from "@usemcpkit/core";

export const usersUsersSetPrimaryEmailVisibilityForAuthenticatedUser = defineTool({
  name: "users:users:set_primary_email_visibility_for_authenticated_user",
  description:
    "Set primary email visibility for the authenticated user. Sets the visibility for your primary email addresses.",
  input: {
    type: "object",
    properties: {
      visibility: {
        type: "string",
        description: "Denotes whether an email is publicly visible.",
        enum: ["public", "private"],
      },
    },
    required: ["visibility"],
  },
  request: {
    method: "PATCH",
    path: "/user/email/visibility",
    body: ["visibility"],
  },
});
