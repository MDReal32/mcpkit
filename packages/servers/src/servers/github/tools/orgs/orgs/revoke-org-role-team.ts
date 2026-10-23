import { defineTool } from "@usemcpkit/core";

export const orgsOrgsRevokeOrgRoleTeam = defineTool({
  name: "orgs:orgs:revoke_org_role_team",
  description:
    'Remove an organization role from a team. Removes an organization role from a team. For more information on organization roles, see "Using organization roles."',
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      team_slug: {
        type: "string",
        description: "The slug of the team name.",
      },
      role_id: {
        type: "integer",
        description: "The unique identifier of the role.",
      },
    },
    required: ["org", "team_slug", "role_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/organization-roles/teams/{team_slug}/{role_id}",
  },
});
