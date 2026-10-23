import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensCreateProjectsServiceAccountsPersonalAccessTokensRotate = defineTool({
  name: "security:access_tokens:create_projects_service_accounts_personal_access_tokens_rotate",
  description:
    "Rotate a personal access token for a project service account. Rotates a specified personal access token for a project service account. This revokes the existing token and creates a token with the same name, description, and scopes.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      token_id: {
        type: "integer",
        description: "ID of the personal access token.",
      },
      user_id: {
        type: "integer",
        description: "ID of the service account.",
      },
      expires_at: {
        type: "string",
        description:
          "Date when the access token expires. Introduced in GitLab 17.9. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise.",
      },
    },
    required: ["id", "token_id", "user_id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/service_accounts/{user_id}/personal_access_tokens/{token_id}/rotate",
    body: ["expires_at"],
  },
});
