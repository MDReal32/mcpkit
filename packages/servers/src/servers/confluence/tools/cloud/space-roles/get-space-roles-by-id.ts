import { defineTool } from "@usemcpkit/core";

export const cloudSpaceRolesGetSpaceRolesById = defineTool({
  name: "cloud:space_roles:get_space_roles_by_id",
  description: "[Cloud] Get space role by ID. Retrieves the space role by ID.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the space role to retrieve.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/space-roles/{id}",
  },
});
