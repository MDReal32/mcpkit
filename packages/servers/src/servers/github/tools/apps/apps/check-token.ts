import { defineTool } from "@usemcpkit/core";

export const appsAppsCheckToken = defineTool({
  name: "apps:apps:check_token",
  description:
    "Check a token. OAuth applications and GitHub applications with OAuth authorizations can use this API method for checking OAuth token validity without exceeding the normal rate limits for failed login attempts. Authentication works differently with this particular endpoint. Invalid tokens will return `404 NOT FOUND`.",
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
    method: "POST",
    path: "/applications/{client_id}/token",
    body: ["access_token"],
  },
});
