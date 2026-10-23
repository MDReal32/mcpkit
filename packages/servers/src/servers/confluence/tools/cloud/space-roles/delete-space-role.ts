import { defineTool } from "@usemcpkit/core";

export const cloudSpaceRolesDeleteSpaceRole = defineTool({
  name: "cloud:space_roles:delete_space_role",
  description: "[Cloud] Delete a space role",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Id of the space role",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/space-roles/{id}",
  },
});
