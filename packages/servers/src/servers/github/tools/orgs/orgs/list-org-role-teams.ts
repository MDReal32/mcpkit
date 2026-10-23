import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListOrgRoleTeams = defineTool({
  name: "orgs:orgs:list_org_role_teams",
  description:
    'List teams that are assigned to an organization role. Lists the teams that are assigned to an organization role. For more information on organization roles, see "Using organization roles."',
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      role_id: {
        type: "integer",
        description: "The unique identifier of the role.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["org", "role_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/organization-roles/{role_id}/teams",
    query: ["per_page", "page"],
  },
});
