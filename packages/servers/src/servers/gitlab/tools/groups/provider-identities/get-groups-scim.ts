import { defineTool } from "@usemcpkit/core";

export const groupsProviderIdentitiesGetGroupsScim = defineTool({
  name: "groups:provider_identities:get_groups_scim",
  description: "Retrieve a SCIM identity. Retrieves a specified SCIM identity.",
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
    path: "/groups/{id}/scim/{uid}",
  },
});
