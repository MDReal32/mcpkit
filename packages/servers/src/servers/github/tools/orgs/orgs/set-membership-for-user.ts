import { defineTool } from "@usemcpkit/core";

export const orgsOrgsSetMembershipForUser = defineTool({
  name: "orgs:orgs:set_membership_for_user",
  description:
    "Set organization membership for a user. Only authenticated organization owners can add a member to the organization or update the member's role.",
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
      role: {
        type: "string",
        description:
          "The role to give the user in the organization. Can be one of: * `admin` - The user will become an owner of the organization. * `member` - The user will become a non-owner member of the organization.",
        default: "member",
        enum: ["admin", "member"],
      },
    },
    required: ["org", "username"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/memberships/{username}",
    body: ["role"],
  },
});
