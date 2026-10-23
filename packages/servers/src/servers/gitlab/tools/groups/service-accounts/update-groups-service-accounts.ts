import { defineTool } from "@usemcpkit/core";

export const groupsServiceAccountsUpdateGroupsServiceAccounts = defineTool({
  name: "groups:service_accounts:update_groups_service_accounts",
  description: "Update a group service account. Update a specified group service account.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
          "Username of the user account. If omitted when creating a new service account, generates a username prefixed with `service_account_group_`.",
      },
      email: {
        type: "string",
        description:
          "Email address of the user account. If omitted when creating a new service account, generates an email address prefixed with `service_account_group_`. Custom email addresses require confirmation, unless the group has a matching verified domain or email confirmation settings are turned off.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "PATCH",
    path: "/groups/{id}/service_accounts/{user_id}",
    body: ["name", "username", "email"],
  },
});
