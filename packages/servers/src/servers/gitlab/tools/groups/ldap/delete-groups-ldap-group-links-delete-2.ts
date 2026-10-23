import { defineTool } from "@usemcpkit/core";

export const groupsLdapDeleteGroupsLdapGroupLinksDelete2 = defineTool({
  name: "groups:ldap:delete_groups_ldap_group_links_delete_2",
  description:
    "Delete LDAP group link. Deletes an LDAP group link for a specific LDAP provider.Deprecated. Scheduled for removal in a future release.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      cn: {
        type: "string",
        description: "CN of an LDAP group.",
      },
      provider: {
        type: "string",
        description: "Name of the provider for the LDAP group link.",
      },
    },
    required: ["id", "cn", "provider"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/ldap_group_links/{provider}/{cn}",
  },
});
