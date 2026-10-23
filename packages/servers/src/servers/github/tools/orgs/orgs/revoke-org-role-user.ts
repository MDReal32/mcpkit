import { defineTool } from "@usemcpkit/core";

export const orgsOrgsRevokeOrgRoleUser = defineTool({
  name: "orgs:orgs:revoke_org_role_user",
  description:
    'Remove an organization role from a user. Remove an organization role from a user. For more information on organization roles, see "Using organization roles."',
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      role_id: {
        type: "integer",
        description: "The unique identifier of the role.",
      },
    },
    required: ["org", "username", "role_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/organization-roles/users/{username}/{role_id}",
  },
});
