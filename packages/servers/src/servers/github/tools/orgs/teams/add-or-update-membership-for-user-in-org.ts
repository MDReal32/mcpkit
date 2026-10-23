import { defineTool } from "@usemcpkit/core";

export const orgsTeamsAddOrUpdateMembershipForUserInOrg = defineTool({
  name: "orgs:teams:add_or_update_membership_for_user_in_org",
  description:
    "Add or update team membership for a user. Adds an organization member to a team. An authenticated organization owner or team maintainer can add organization members to a team.",
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
      role: {
        type: "string",
        description: "The role that this user should have in the team.",
        default: "member",
        enum: ["member", "maintainer"],
      },
    },
    required: ["org", "team_slug", "username"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/teams/{team_slug}/memberships/{username}",
    body: ["role"],
  },
});
