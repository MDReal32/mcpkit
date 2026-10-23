import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateUnlicensedRevoke = defineTool({
  name: "datacenter:permissions:update_unlicensed_revoke",
  description:
    "[Data Center] Revoke global permissions from unlicensed users. Revoke global permissions from unlicensed users.",
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
    path: "/rest/api/permissions/unlicensed/revoke",
    bodyArg: "body",
  },
});
