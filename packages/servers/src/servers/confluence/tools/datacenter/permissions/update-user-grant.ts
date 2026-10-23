import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdateUserGrant = defineTool({
  name: "datacenter:permissions:update_user_grant",
  description: "[Data Center] Grants global permissions to a user. Grant global permissions to a user.",
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
    path: "/rest/api/permissions/user/{user}/grant",
    bodyArg: "body",
  },
});
