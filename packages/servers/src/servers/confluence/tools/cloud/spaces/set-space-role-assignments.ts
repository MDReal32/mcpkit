import { defineTool } from "@usemcpkit/core";

export const cloudSpacesSetSpaceRoleAssignments = defineTool({
  name: "cloud:spaces:set_space_role_assignments",
  description:
    "[Cloud] Set space role assignments. Sets space role assignments as specified in the payload. For each entry, if `roleId` is provided the principal is assigned to that role. If `roleId` is omitted, the role assignment for that principal is removed, if it exists.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the space for which to retrieve assignments.",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            principal: {
              type: "object",
              description: "The principal of the role assignment.",
            },
            roleId: {
              type: "string",
              description: "The role to which the principal is assigned.",
            },
          },
          required: ["principal"],
        },
      },
    },
    required: ["id", "body"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/spaces/{id}/role-assignments",
    bodyArg: "body",
  },
});
