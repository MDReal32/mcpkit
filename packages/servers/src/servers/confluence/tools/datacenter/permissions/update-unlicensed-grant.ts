import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateUnlicensedGrant = defineTool({
  name: "datacenter:permissions:update_unlicensed_grant",
  description:
    "[Data Center] Grants global permissions to unlicensed users. Grant global permissions to unlicensed users.",
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
    path: "/rest/api/permissions/unlicensed/grant",
    bodyArg: "body",
  },
});
