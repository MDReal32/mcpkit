import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceUpdatePermissionsAnonymousRevoke = defineTool({
  name: "datacenter:space:update_permissions_anonymous_revoke",
  description:
    "[Data Center] Revoke space permissions from anonymous user. Revoke permissions from anonymous user in the given space. If anonymous user doesn't have permissions that we are trying to revoke, those permissions will be silently skipped. Multiple permissions could be passed in one request. Supported targetType and operationKey pairs: * space read * space administer * space export * space restrict * space delete_own * space delete_mail * page create * page d…",
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
    path: "/rest/api/space/{spaceKey}/permissions/anonymous/revoke",
    bodyArg: "body",
  },
});
