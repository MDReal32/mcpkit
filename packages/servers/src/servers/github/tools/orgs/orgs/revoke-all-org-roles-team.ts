import { defineTool } from "@usemcpkit/core";

export const orgsOrgsRevokeAllOrgRolesTeam = defineTool({
  name: "orgs:orgs:revoke_all_org_roles_team",
  description:
    'Remove all organization roles for a team. Removes all assigned organization roles from a team. For more information on organization roles, see "Using organization roles."',
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
    },
    required: ["org", "team_slug"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/organization-roles/teams/{team_slug}",
  },
});
