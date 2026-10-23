import { defineTool } from "@usemcpkit/core";

export const groupsServiceAccountsUpdateProjectsServiceAccounts = defineTool({
  name: "groups:service_accounts:update_projects_service_accounts",
  description: "Update a project service account. Update a specified project service account.",
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
      name: {
        type: "string",
        description: "Name of the user. If omitted when creating a new service account, uses `Service account user`.",
      },
      username: {
        type: "string",
        description:
          "Username of the user account. If omitted when creating a new service account, generates a name prefixed with `service_account_project_`.",
      },
      email: {
        type: "string",
        description:
          "Email address of the user account. If omitted when creating a new service account, generates an email address prefixed with `service_account_project_`. Custom email addresses require confirmation, unless the group has a matching verified domain or email confirmation settings are turned off.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/service_accounts/{user_id}",
    body: ["name", "username", "email"],
  },
});
