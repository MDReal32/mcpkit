import { defineTool } from "@usemcpkit/core";

export const groupsProviderIdentitiesGetGroupsSaml = defineTool({
  name: "groups:provider_identities:get_groups_saml",
  description: "Retrieve a SAML identity. Retrieves a specified SAML identity.",
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
    method: "GET",
    path: "/groups/{id}/saml/{uid}",
  },
});
