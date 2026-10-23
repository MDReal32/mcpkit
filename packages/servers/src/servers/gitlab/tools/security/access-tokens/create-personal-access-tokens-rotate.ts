import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensCreatePersonalAccessTokensRotate = defineTool({
  name: "security:access_tokens:create_personal_access_tokens_rotate",
  description:
    "Rotate a personal access token. Rotates a specified personal access token. This revokes the previous token and creates a token that expires after one week. Administrators can revoke tokens for any user. Non-administrators can only revoke their own tokens.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the personal access token.",
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
    path: "/personal_access_tokens/{id}/rotate",
    body: ["expires_at"],
  },
});
