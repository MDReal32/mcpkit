import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateAnonymousGrant = defineTool({
  name: "datacenter:permissions:update_anonymous_grant",
  description:
    "[Data Center] Grants global permissions to anonymous users. Grant global permissions to anonymous users.",
  input: {
    type: "object",
    properties: {
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
  },
  request: {
    method: "PUT",
    path: "/rest/api/permissions/anonymous/grant",
    bodyArg: "body",
  },
});
