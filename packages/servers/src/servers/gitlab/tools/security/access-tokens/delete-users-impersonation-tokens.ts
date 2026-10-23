import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensDeleteUsersImpersonationTokens = defineTool({
  name: "security:access_tokens:delete_users_impersonation_tokens",
  description:
    "Revoke an impersonation token. Revokes an impersonation token for a specified user. Administrators only.",
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
    method: "DELETE",
    path: "/users/{user_id}/impersonation_tokens/{impersonation_token_id}",
  },
});
