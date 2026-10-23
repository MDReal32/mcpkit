import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensGetProjectsAccessTokens = defineTool({
  name: "security:access_tokens:get_projects_access_tokens",
  description: "Retrieve details on a project access token. Retrieves details on a specified project access token.",
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
    method: "GET",
    path: "/projects/{id}/access_tokens/{token_id}",
  },
});
