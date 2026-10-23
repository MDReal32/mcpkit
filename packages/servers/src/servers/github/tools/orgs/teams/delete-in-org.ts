import { defineTool } from "@usemcpkit/core";

export const orgsTeamsDeleteInOrg = defineTool({
  name: "orgs:teams:delete_in_org",
  description:
    "Delete a team. To delete a team, the authenticated user must be an organization owner or team maintainer.",
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
    path: "/orgs/{org}/teams/{team_slug}",
  },
});
