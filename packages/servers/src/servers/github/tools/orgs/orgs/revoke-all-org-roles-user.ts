import { defineTool } from "@usemcpkit/core";

export const orgsOrgsRevokeAllOrgRolesUser = defineTool({
  name: "orgs:orgs:revoke_all_org_roles_user",
  description:
    'Remove all organization roles for a user. Revokes all assigned organization roles from a user. For more information on organization roles, see "Using organization roles."',
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
    },
    required: ["org", "username"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/organization-roles/users/{username}",
  },
});
