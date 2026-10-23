import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceUpdatePermissionsUserGrant = defineTool({
  name: "datacenter:space:update_permissions_user_grant",
  description:
    "[Data Center] Grants space permissions to a user. Grant permissions to a user in the given space. Operation doesn't override existing permissions, will only add those one that weren't granted before. Multiple permissions could be passed in one request. Supported targetType and operationKey pairs: * space read * space administer * space export * space restrict * space delete_own * space delete_mail * page create * page delete * blogpost create *…",
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
    path: "/rest/api/space/{spaceKey}/permissions/user/{userKey}/grant",
    bodyArg: "body",
  },
});
