import { defineTool } from "@usemcpkit/core";

export const cloudSpaceRolesUpdateSpaceRole = defineTool({
  name: "cloud:space_roles:update_space_role",
  description: "[Cloud] Update a space role. Update a space role.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Id of the space role",
      },
      name: {
        type: "string",
        description: "Name of the space role",
      },
      description: {
        type: "string",
        description: "Description for the space role",
      },
      spacePermissions: {
        type: "array",
        description:
          'The ids of the space permissions associated with the space role. Sample value "read/space"; retrieve ids from responses returned by GET /space-permissions endpoint',
        items: {
          type: "string",
        },
      },
      anonymousReassignmentRoleId: {
        type: "string",
        description:
          "If space anonymous access is assigned to the role being modified, the Id of a role to migrate those assignments to can be specified. Anonymous access role assignments left unchanged if unspecified.",
      },
      guestReassignmentRoleId: {
        type: "string",
        description:
          "If guests are assigned to the role being modified, the Id of a role to migrate those assignments to can be specified. Guest role assignments left unchanged if unspecified.",
      },
    },
    required: ["id", "name", "description", "spacePermissions"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/space-roles/{id}",
    body: ["name", "description", "spacePermissions", "anonymousReassignmentRoleId", "guestReassignmentRoleId"],
  },
});
