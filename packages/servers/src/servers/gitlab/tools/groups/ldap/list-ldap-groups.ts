import { defineTool } from '@usemcpkit/core';

export const groupsLdapListLdapGroups = defineTool({
  name: 'groups:ldap:list_ldap_groups',
  description: 'List all LDAP groups. Lists all LDAP groups on the GitLab instance. Limited to 20 results.',
  input: {
    type: 'object',
    properties: {
      search: {
        type: 'string',
        default: '',
        description: 'Search for a specific LDAP group.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/ldap/groups',
    query: ['search'],
  },
});
