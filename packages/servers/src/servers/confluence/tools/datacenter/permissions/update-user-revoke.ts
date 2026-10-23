import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateUserRevoke = defineTool({
  name: "datacenter:permissions:update_user_revoke",
  description: "[Data Center] Revoke global permissions from a user. Revoke global permissions from a user.",
  input: {
    type: "object",
    properties: {
      user: {
        type: "string",
        description: "the key or username of the user to look up.",
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
    required: ["user"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/permissions/user/{user}/revoke",
    bodyArg: "body",
  },
});
