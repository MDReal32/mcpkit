import { defineTool } from "@usemcpkit/core";

export const groupsLdapDeleteGroupsLdapGroupLinks = defineTool({
  name: "groups:ldap:delete_groups_ldap_group_links",
  description:
    "Delete an LDAP group link with CN or filter. Deletes an LDAP group link using a CN or filter.Deleting by filter is only supported in the Premium tier and above.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      cn: {
        type: "string",
        description: "CN of an LDAP group. Exactly one of `cn`, `filter` must be provided.",
      },
      filter: {
        type: "string",
        description: "LDAP filter for the group. Exactly one of `cn`, `filter` must be provided.",
      },
      provider: {
        type: "string",
        description: "Name of the provider for the LDAP group link.",
      },
    },
    required: ["id", "provider"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/ldap_group_links",
    query: ["cn", "filter", "provider"],
  },
});
