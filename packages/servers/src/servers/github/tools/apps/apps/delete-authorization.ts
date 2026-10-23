import { defineTool } from "@usemcpkit/core";

export const appsAppsDeleteAuthorization = defineTool({
  name: "apps:apps:delete_authorization",
  description:
    "Delete an app authorization. OAuth and GitHub application owners can revoke a grant for their application and a specific user. You must provide a valid OAuth `access_token` as an input parameter and the grant for the token's owner will be deleted. Deleting an application's grant will also delete all OAuth tokens associated with the application for the user. Once deleted, the application will have no access to the user's acco…",
  input: {
    type: "object",
    properties: {
      client_id: {
        type: "string",
        description: "The client ID of the GitHub app.",
      },
      access_token: {
        type: "string",
        description: "The OAuth access token used to authenticate to the GitHub API.",
      },
    },
    required: ["client_id", "access_token"],
  },
  request: {
    method: "DELETE",
    path: "/applications/{client_id}/grant",
    body: ["access_token"],
  },
});
