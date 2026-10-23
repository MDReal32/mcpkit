import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensCreatePersonalAccessTokensSelfRotate = defineTool({
  name: "security:access_tokens:create_personal_access_tokens_self_rotate",
  description: "Rotate a personal access token. Rotates a personal access token by passing it to the API in a header",
  input: {
    type: "object",
    properties: {
      expires_at: {
        type: "string",
        description:
          "Date when the access token expires. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise.",
      },
    },
  },
  request: {
    method: "POST",
    path: "/personal_access_tokens/self/rotate",
    body: ["expires_at"],
  },
});
