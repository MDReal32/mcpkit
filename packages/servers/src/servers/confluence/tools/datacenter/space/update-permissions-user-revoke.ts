import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceUpdatePermissionsUserRevoke = defineTool({
  name: "datacenter:space:update_permissions_user_revoke",
  description:
    "[Data Center] Revoke space permissions from a user. Revoke permissions from a user in the given space. If user doesn't have permissions that we are trying to revoke, those permissions will be silently skipped. Multiple permissions could be passed in one request. Supported targetType and operationKey pairs: * space read * space administer * space export * space restrict * space delete_own * space delete_mail * page create * page delete * blogpost c…",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
      userKey: {
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
    required: ["spaceKey", "userKey"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/space/{spaceKey}/permissions/user/{userKey}/revoke",
    bodyArg: "body",
  },
});
