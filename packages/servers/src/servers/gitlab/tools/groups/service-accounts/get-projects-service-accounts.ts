import { defineTool } from "@usemcpkit/core";

export const groupsServiceAccountsGetProjectsServiceAccounts = defineTool({
  name: "groups:service_accounts:get_projects_service_accounts",
  description: "Get a single project service account. Gets a specified service account in a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      user_id: {
        type: "integer",
        description: "ID of the service account.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/service_accounts/{user_id}",
  },
});
