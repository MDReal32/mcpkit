import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensDeleteProjectsAccessTokens = defineTool({
  name: "security:access_tokens:delete_projects_access_tokens",
  description: "Revoke a project access token. Revokes a specified project access token.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
    path: "/projects/{id}/access_tokens/{token_id}",
  },
});
