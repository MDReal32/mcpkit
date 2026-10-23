import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsBulkEditDashboards = defineTool({
  name: "collaboration:dashboards:bulk_edit_dashboards",
  description:
    "Bulk edit dashboards. Bulk edit dashboards. Maximum number of dashboards to be edited at the same time is 100.",
  input: {
    type: "object",
    properties: {
      action: {
        type: "string",
        description: "Allowed action for bulk edit shareable entity",
        enum: ["changeOwner", "changePermission", "addPermission", "removePermission"],
      },
      changeOwnerDetails: {
        type: "object",
        description: "The details of change owner action.",
        properties: {
          autofixName: {
            type: "boolean",
            description: "Whether the name is fixed automatically if it's duplicated after changing owner.",
          },
          newOwner: {
            type: "string",
            description: "The account id of the new owner.",
          },
        },
        required: ["autofixName", "newOwner"],
      },
      entityIds: {
        type: "array",
        description: "The id list of shareable entities to be changed.",
        items: {
          type: "integer",
        },
      },
      extendAdminPermissions: {
        type: "boolean",
        description: "Whether the actions are executed by users with Administer Jira global permission.",
      },
      permissionDetails: {
        type: "object",
        description: "The permission details to be changed.",
        properties: {
          editPermissions: {
            type: "array",
            description: "The edit permissions for the shareable entities.",
            items: {
              type: "object",
              description: "Details of a share permission for the filter.",
            },
          },
          sharePermissions: {
            type: "array",
            description: "The share permissions for the shareable entities.",
            items: {
              type: "object",
              description: "Details of a share permission for the filter.",
            },
          },
        },
        required: ["editPermissions", "sharePermissions"],
      },
    },
    required: ["action", "entityIds"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/dashboard/bulk/edit",
    body: ["action", "changeOwnerDetails", "entityIds", "extendAdminPermissions", "permissionDetails"],
  },
});
