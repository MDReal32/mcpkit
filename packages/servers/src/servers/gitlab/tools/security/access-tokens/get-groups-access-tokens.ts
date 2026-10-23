import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensGetGroupsAccessTokens = defineTool({
  name: "security:access_tokens:get_groups_access_tokens",
  description: "Retrieve details on a group access token. Retrieves details on a specified group access token.",
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
    method: "GET",
    path: "/groups/{id}/access_tokens/{token_id}",
  },
});
