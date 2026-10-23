import { defineTool } from "@usemcpkit/core";

export const orgsTeamsGetMembershipForUserInOrg = defineTool({
  name: "orgs:teams:get_membership_for_user_in_org",
  description: "Get team membership for a user. Team members will include the members of child teams.",
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
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
    },
    required: ["org", "team_slug", "username"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/teams/{team_slug}/memberships/{username}",
  },
});
