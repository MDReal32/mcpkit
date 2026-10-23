import { defineTool } from "@usemcpkit/core";

export const groupsLdapCreateGroupsLdapSync = defineTool({
  name: "groups:ldap:create_groups_ldap_sync",
  description:
    "Sync a group with LDAP. Syncs a specified group with its linked LDAP group. You must be an administrator or have the Owner role for the group.",
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
    method: "POST",
    path: "/groups/{id}/ldap_sync",
  },
});
