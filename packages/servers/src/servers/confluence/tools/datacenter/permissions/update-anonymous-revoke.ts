import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateAnonymousRevoke = defineTool({
  name: "datacenter:permissions:update_anonymous_revoke",
  description:
    "[Data Center] Revoke global permissions from anonymous users. Revoke global permissions from anonymous users.",
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
    path: "/rest/api/permissions/anonymous/revoke",
    bodyArg: "body",
  },
});
