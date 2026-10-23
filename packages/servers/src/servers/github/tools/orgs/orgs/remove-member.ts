import { defineTool } from "@usemcpkit/core";

export const orgsOrgsRemoveMember = defineTool({
  name: "orgs:orgs:remove_member",
  description:
    "Remove an organization member. Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.",
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
    path: "/orgs/{org}/members/{username}",
  },
});
