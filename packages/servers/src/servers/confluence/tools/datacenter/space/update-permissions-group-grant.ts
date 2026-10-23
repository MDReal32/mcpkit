import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceUpdatePermissionsGroupGrant = defineTool({
  name: "datacenter:space:update_permissions_group_grant",
  description:
    "[Data Center] Grants space permissions to a group. Grant permissions to a group in the given space. Operation doesn't override existing permissions, will only add those one that weren't granted before. Multiple permissions could be passed in one request. Supported targetType and operationKey pairs: * space read * space administer * space export * space restrict * space delete_own * space delete_mail * page create * page delete * blogpost create *…",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
      groupName: {
        type: "string",
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
    required: ["spaceKey", "groupName"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/space/{spaceKey}/permissions/group/{groupName}/grant",
    bodyArg: "body",
  },
});
