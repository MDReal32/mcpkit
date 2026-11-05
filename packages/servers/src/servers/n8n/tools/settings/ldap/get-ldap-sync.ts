import { defineTool } from "@usemcpkit/core";

export const settingsLdapGetLdapSync = defineTool({
  name: "settings:ldap:get_ldap_sync",
  description:
    "Retrieve LDAP synchronization history. Retrieve the history of LDAP synchronizations, most recent first. Requires the `ldap:sync` scope and the LDAP feature to be licensed.",
  input: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
    },
  },
  request: {
    method: "GET",
    path: "/settings/ldap/sync",
    query: ["limit", "cursor"],
  },
});
