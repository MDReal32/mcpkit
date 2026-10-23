import { defineTool } from "@usemcpkit/core";

export const orgsTeamsRemoveMembershipForUserInOrg = defineTool({
  name: "orgs:teams:remove_membership_for_user_in_org",
  description:
    "Remove team membership for a user. To remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. Removing team membership does not delete the user, it just removes their membership from the team.",
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
    method: "DELETE",
    path: "/orgs/{org}/teams/{team_slug}/memberships/{username}",
  },
});
