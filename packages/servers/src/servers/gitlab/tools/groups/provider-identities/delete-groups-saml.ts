import { defineTool } from "@usemcpkit/core";

export const groupsProviderIdentitiesDeleteGroupsSaml = defineTool({
  name: "groups:provider_identities:delete_groups_saml",
  description: "Delete a SAML identity. Deletes a specified SAML identity.",
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
    path: "/groups/{id}/saml/{uid}",
  },
});
