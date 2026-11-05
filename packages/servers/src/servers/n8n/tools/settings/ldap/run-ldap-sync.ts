import { defineTool } from "@usemcpkit/core";

export const settingsLdapRunLdapSync = defineTool({
  name: "settings:ldap:run_ldap_sync",
  description:
    "Trigger an LDAP synchronization. Manually trigger an LDAP synchronization. The response returns the new sync history record. Requires the `ldap:sync` scope and the LDAP feature to be licensed.",
  input: {
    type: "object",
    properties: {
      type: {
        type: "string",
        description:
          "Type of synchronization. 'live' applies changes to the database. 'dry' performs a test run and does not persist changes.",
        enum: ["live", "dry"],
      },
    },
    required: ["type"],
  },
  request: {
    method: "POST",
    path: "/settings/ldap/sync",
    body: ["type"],
  },
});
