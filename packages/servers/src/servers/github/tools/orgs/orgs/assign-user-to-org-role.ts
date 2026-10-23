import { defineTool } from "@usemcpkit/core";

export const orgsOrgsAssignUserToOrgRole = defineTool({
  name: "orgs:orgs:assign_user_to_org_role",
  description:
    'Assign an organization role to a user. Assigns an organization role to a member of an organization. For more information on organization roles, see "Using organization roles."',
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
      role_id: {
        type: "integer",
        description: "The unique identifier of the role.",
      },
    },
    required: ["org", "username", "role_id"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/organization-roles/users/{username}/{role_id}",
  },
});
