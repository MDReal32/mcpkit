import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensCreateGroupsAccessTokensSelfRotate = defineTool({
  name: "security:access_tokens:create_groups_access_tokens_self_rotate",
  description: "Rotate a group access token. Rotates a group access token by passing it to the API in a header.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      expires_at: {
        type: "string",
        description:
          "Date when the access token expires. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/access_tokens/self/rotate",
    body: ["expires_at"],
  },
});
