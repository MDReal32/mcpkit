import { defineTool } from "@usemcpkit/core";

export const orgsOrgsUnblockUser = defineTool({
  name: "orgs:orgs:unblock_user",
  description: "Unblock a user from an organization. Unblocks the given user on behalf of the specified organization.",
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
    path: "/orgs/{org}/blocks/{username}",
  },
});
