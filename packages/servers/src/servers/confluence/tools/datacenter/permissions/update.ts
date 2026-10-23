import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsUpdate = defineTool({
  name: "datacenter:permissions:update",
  description:
    "[Data Center] Set global permissions to multiple users/groups. Sets global permissions to multiple users/groups.",
  input: {
    type: "object",
    properties: {
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            userKey: {
              type: "string",
            },
            groupName: {
              type: "string",
            },
            operations: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/permissions",
    bodyArg: "body",
  },
});
