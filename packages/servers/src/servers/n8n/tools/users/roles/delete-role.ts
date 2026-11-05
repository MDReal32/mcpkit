import { defineTool } from "@usemcpkit/core";

export const usersRolesDeleteRole = defineTool({
  name: "users:roles:delete_role",
  description:
    "Delete a custom role. Deletes a custom role. System roles cannot be deleted. A role with users assigned cannot be deleted unless `reassignRoleSlug` is set to move those users to another role first.",
  input: {
    type: "object",
    properties: {
      roleSlug: {
        type: "string",
        description: "The slug of the role.",
      },
      reassignRoleSlug: {
        type: "string",
      },
    },
    required: ["roleSlug"],
  },
  request: {
    method: "DELETE",
    path: "/roles/{roleSlug}",
    query: ["reassignRoleSlug"],
  },
});
