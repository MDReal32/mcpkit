import { defineTool } from '@usemcpkit/core';

export const groupsLdapListLdapGroupsGet = defineTool({
  name: 'groups:ldap:list_ldap_groups_get',
  description:
    'List all LDAP groups by provider. Lists all LDAP groups for the specified provider. Limited to 20 results.',
  input: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        description: 'Name of the LDAP provider.',
      },
      search: {
        type: 'string',
        default: '',
        description: 'Search for a specific LDAP group.',
      },
    },
    required: ['provider'],
  },
  request: {
    method: 'GET',
    path: '/ldap/{provider}/groups',
    query: ['search'],
  },
});
