import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateGroupGrant = defineTool({
  name: "datacenter:permissions:update_group_grant",
  description: "[Data Center] Grants global permissions to a group. Grant global permissions to a group.",
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
    path: "/rest/api/permissions/group/{groupName}/grant",
    bodyArg: "body",
  },
});
