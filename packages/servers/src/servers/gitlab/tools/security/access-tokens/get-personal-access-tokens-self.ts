import { defineTool } from "@usemcpkit/core";

export const securityAccessTokensGetPersonalAccessTokensSelf = defineTool({
  name: "security:access_tokens:get_personal_access_tokens_self",
  description:
    "Retrieve a personal access token. Retrieves a specified personal access token by passing it to the API in a header.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/personal_access_tokens/self",
  },
});
