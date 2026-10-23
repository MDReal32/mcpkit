import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensGetUsersImpersonationTokens = defineTool({
  name: "security:access_tokens:get_users_impersonation_tokens",
  description:
    "Retrieve an impersonation token for a user. Retrieves an impersonation token for a specified user. Administrators only.",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "integer",
        description: "ID of the user.",
      },
      impersonation_token_id: {
        type: "integer",
        description: "ID of the impersonation token.",
      },
    },
    required: ["user_id", "impersonation_token_id"],
  },
  request: {
    method: "GET",
    path: "/users/{user_id}/impersonation_tokens/{impersonation_token_id}",
  },
});
