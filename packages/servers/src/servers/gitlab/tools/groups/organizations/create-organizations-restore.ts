import { defineTool } from "@usemcpkit/core";

export const groupsOrganizationsCreateOrganizationsRestore = defineTool({
  name: "groups:organizations:create_organizations_restore",
  description:
    "Restore a soft-deleted organization. Restores a soft-deleted organization. This feature was introduced in GitLab 19.6.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the organization.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/organizations/{id}/restore",
  },
});
