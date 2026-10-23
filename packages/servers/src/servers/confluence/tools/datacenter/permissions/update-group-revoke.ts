import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateGroupRevoke = defineTool({
  name: "datacenter:permissions:update_group_revoke",
  description: "[Data Center] Revoke global permissions from a group. Revoke global permissions from a group.",
  input: {
    type: "object",
    properties: {
      groupName: {
        type: "string",
        description: "the name of the group to look up.",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            targetType: {
              type: "string",
            },
            operationKey: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["groupName"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/permissions/group/{groupName}/revoke",
    bodyArg: "body",
  },
});
