import { defineTool } from "@usemcpkit/core";

export const groupsServiceAccountsDeleteProjectsServiceAccounts = defineTool({
  name: "groups:service_accounts:delete_projects_service_accounts",
  description:
    "Delete a project service account. Deletes a specified project service account. Available only for project Owners, Maintainers, and administrators.",
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
      hard_delete: {
        type: "boolean",
        description:
          "If `true`, contributions that would usually be moved to a ghost user are deleted instead, along with groups owned solely by this service account.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/service_accounts/{user_id}",
    query: ["hard_delete"],
  },
});
