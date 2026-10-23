import { defineTool } from "@usemcpkit/core";

export const usersUsersAddSocialAccountForAuthenticatedUser = defineTool({
  name: "users:users:add_social_account_for_authenticated_user",
  description:
    "Add social accounts for the authenticated user. Add one or more social accounts to the authenticated user's profile.",
  input: {
    type: "object",
    properties: {
      account_urls: {
        type: "array",
        description: "Full URLs for the social media profiles to add.",
        items: {
          type: "string",
        },
      },
    },
    required: ["account_urls"],
  },
  request: {
    method: "POST",
    path: "/user/social_accounts",
    body: ["account_urls"],
  },
});
