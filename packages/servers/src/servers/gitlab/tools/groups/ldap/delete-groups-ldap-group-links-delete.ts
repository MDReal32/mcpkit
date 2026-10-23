import { defineTool } from "@usemcpkit/core";

export const groupsLdapDeleteGroupsLdapGroupLinksDelete = defineTool({
  name: "groups:ldap:delete_groups_ldap_group_links_delete",
  description:
    "Delete LDAP group link. Deletes an LDAP group link. Deprecated. Scheduled for removal in a future release.",
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
    },
    required: ["id", "cn"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/ldap_group_links/{cn}",
  },
});
