import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensDeletePersonalAccessTokens = defineTool({
  name: "security:access_tokens:delete_personal_access_tokens",
  description:
    "Revoke a personal access token. Revokes a specified personal access token. Administrators can revoke tokens for any user. Non-administrators can only revoke their own tokens.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the personal access token.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/personal_access_tokens/{id}",
  },
});
