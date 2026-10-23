import { defineTool } from "@usemcpkit/core";

export const groupsLdapCreateGroupsLdapGroupLinks = defineTool({
  name: "groups:ldap:create_groups_ldap_group_links",
  description:
    "Add an LDAP group link with CN or filter. Adds an LDAP group link using a CN or filter.Adding a group link by filter is only supported in the Premium tier and above.",
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
      group_access: {
        type: "integer",
        description: "Default access level for members of the LDAP group.",
        enum: [5, 10, 15, 20, 25, 30, 40, 50],
      },
      provider: {
        type: "string",
        description: "Name of the provider for the LDAP group link.",
      },
      member_role_id: {
        type: "integer",
        description: "ID of the member role for members of the LDAP group. Ultimate only.",
      },
    },
    required: ["id", "group_access", "provider"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/ldap_group_links",
    body: ["cn", "filter", "group_access", "provider", "member_role_id"],
  },
});
