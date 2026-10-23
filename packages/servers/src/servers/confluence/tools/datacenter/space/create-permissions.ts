import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceCreatePermissions = defineTool({
  name: "datacenter:space:create_permissions",
  description:
    "[Data Center] Set permissions to multiple users/groups/anonymous user in the given space. Sets permissions to multiple users/groups in the given space. Request should contain all permissions that user/group/anonymous user will have in a given space. If permission is absent in the request, but was granted before, it will be revoked. If empty list of permissions passed to user/group/anonymous user, then all their existing permissions will be revoked. If user/group/anonymous user not men…",
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
    required: ["spaceKey"],
  },
  request: {
    method: "POST",
    path: "/rest/api/space/{spaceKey}/permissions",
    bodyArg: "body",
  },
});
