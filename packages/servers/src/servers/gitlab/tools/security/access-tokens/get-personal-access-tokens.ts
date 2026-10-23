import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensGetPersonalAccessTokens = defineTool({
  name: "security:access_tokens:get_personal_access_tokens",
  description:
    "Retrieve a personal access token. Retrieves details for a specified personal access token. Administrators can retrieve details on any token. Non-administrators can only retrieve details on their own tokens.",
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
    method: "GET",
    path: "/personal_access_tokens/{id}",
  },
});
