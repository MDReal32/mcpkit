import { defineTool } from "@usemcpkit/core";

export const groupsProviderIdentitiesDeleteGroupsScim = defineTool({
  name: "groups:provider_identities:delete_groups_scim",
  description: "Delete a SCIM identity. Deletes a specified SCIM identity.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      uid: {
        type: "string",
        description: "External UID of the user.",
      },
    },
    required: ["id", "uid"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/scim/{uid}",
  },
});
