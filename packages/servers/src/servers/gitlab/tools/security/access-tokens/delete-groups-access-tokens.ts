import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensDeleteGroupsAccessTokens = defineTool({
  name: "security:access_tokens:delete_groups_access_tokens",
  description: "Revoke a group access token. Revokes a specified group access token.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      token_id: {
        type: "string",
        description: "ID of the token.",
      },
    },
    required: ["id", "token_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/access_tokens/{token_id}",
  },
});
