import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceUpdatePermissionsAnonymousGrant = defineTool({
  name: "datacenter:space:update_permissions_anonymous_grant",
  description:
    "[Data Center] Grants space permissions to anonymous user. Grant permissions to anonymous user in the given space. Operation doesn't override existing permissions, will only add those one that weren't granted before. Multiple permissions could be passed in one request. Supported targetType and operationKey pairs: * space read * space administer * space export * space restrict * space delete_own * space delete_mail * page create * page delete * blogpost c…",
  input: {
    type: "object",
    properties: {
      spaceKey: {
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
    required: ["spaceKey"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/space/{spaceKey}/permissions/anonymous/grant",
    bodyArg: "body",
  },
});
