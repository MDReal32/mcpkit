import { defineTool } from "@usemcpkit/core";

export const groupsServiceAccountsCreateGroupsServiceAccounts = defineTool({
  name: "groups:service_accounts:create_groups_service_accounts",
  description: "Create a group service account. Creates a service account in a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/service_accounts",
    body: ["name", "username", "email"],
  },
});
