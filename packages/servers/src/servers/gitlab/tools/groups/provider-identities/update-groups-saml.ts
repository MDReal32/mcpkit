import { defineTool } from "@usemcpkit/core";

export const groupsProviderIdentitiesUpdateGroupsSaml = defineTool({
  name: "groups:provider_identities:update_groups_saml",
  description:
    "Update `extern_uid` field for a SAML identity. Updates the `extern_uid` field for a specified SAML identity.",
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
      extern_uid: {
        type: "string",
        description: "New external UID of the user.",
      },
    },
    required: ["id", "uid", "extern_uid"],
  },
  request: {
    method: "PATCH",
    path: "/groups/{id}/saml/{uid}",
    body: ["extern_uid"],
  },
});
