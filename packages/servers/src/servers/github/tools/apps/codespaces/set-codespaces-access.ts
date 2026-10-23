import { defineTool } from "@usemcpkit/core";

export const appsCodespacesSetCodespacesAccess = defineTool({
  name: "apps:codespaces:set_codespaces_access",
  description:
    "[Deprecated] Manage access control for organization codespaces. Sets which users can access codespaces in an organization. This is synonymous with granting or revoking codespaces access permissions for users according to the visibility. OAuth app tokens and personal access tokens (classic) need the `admin:org` scope to use this endpoint.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      visibility: {
        type: "string",
        description:
          "Which users can access codespaces in the organization. `disabled` means that no users can access codespaces in the organization.",
        enum: ["disabled", "selected_members", "all_members", "all_members_and_outside_collaborators"],
      },
      selected_usernames: {
        type: "array",
        description:
          "The usernames of the organization members who should have access to codespaces in the organization. Required when `visibility` is `selected_members`. The provided list of usernames will replace any existing value.",
        items: {
          type: "string",
        },
      },
    },
    required: ["org", "visibility"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/codespaces/access",
    body: ["visibility", "selected_usernames"],
  },
});
