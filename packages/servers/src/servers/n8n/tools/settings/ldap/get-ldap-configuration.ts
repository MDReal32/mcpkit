import { defineTool } from "@usemcpkit/core";

export const settingsLdapGetLdapConfiguration = defineTool({
  name: "settings:ldap:get_ldap_configuration",
  description:
    "Retrieve the LDAP configuration. Retrieve the current LDAP configuration, including every field exposed in the UI. The binding admin password is redacted on read. Requires the `ldap:manage` scope and the LDAP feature to be licensed.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/settings/ldap",
  },
});
