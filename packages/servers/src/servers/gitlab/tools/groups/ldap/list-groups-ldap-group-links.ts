import { defineTool } from "@usemcpkit/core";

export const groupsLdapListGroupsLdapGroupLinks = defineTool({
  name: "groups:ldap:list_groups_ldap_group_links",
  description: "List all LDAP group links. Lists all LDAP group links.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/ldap_group_links",
  },
});
