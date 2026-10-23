import { defineTool } from "@usemcpkit/core";

export const appsAppsResetToken = defineTool({
  name: "apps:apps:reset_token",
  description:
    'Reset a token. OAuth applications and GitHub applications with OAuth authorizations can use this API method to reset a valid OAuth token without end-user involvement. Applications must save the "token" property in the response because changes take effect immediately. Invalid tokens will return `404 NOT FOUND`.',
  input: {
    type: "object",
    properties: {
      client_id: {
        type: "string",
        description: "The client ID of the GitHub app.",
      },
      access_token: {
        type: "string",
        description: "The access_token of the OAuth or GitHub application.",
      },
    },
    required: ["client_id", "access_token"],
  },
  request: {
    method: "PATCH",
    path: "/applications/{client_id}/token",
    body: ["access_token"],
  },
});
