import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceUpdatePermissionsGroupRevoke = defineTool({
  name: "datacenter:space:update_permissions_group_revoke",
  description:
    "[Data Center] Revoke space permissions from a group. Revoke permissions from a group in the given space. If group doesn't have permissions that we are trying to revoke, those permissions will be silently skipped. Multiple permissions could be passed in one request. Supported targetType and operationKey pairs: * space read * space administer * space export * space restrict * space delete_own * space delete_mail * page create * page delete * blogpost…",
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
    path: "/rest/api/space/{spaceKey}/permissions/group/{groupName}/revoke",
    bodyArg: "body",
  },
});
