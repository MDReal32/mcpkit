import { defineTool } from "@usemcpkit/core";

export const orgsTeamsListMembersInOrg = defineTool({
  name: "orgs:teams:list_members_in_org",
  description: "List team members. Team members will include the members of child teams.",
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
      role: {
        type: "string",
        default: "all",
        enum: ["member", "maintainer", "all"],
        description: "Filters members returned by their role in the team.",
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
    required: ["org", "team_slug"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/teams/{team_slug}/members",
    query: ["role", "per_page", "page"],
  },
});
