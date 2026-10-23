import { defineTool } from '@usemcpkit/core';

export const groupsSamlGroupLinksListGroupsSamlGroupLinks = defineTool({
  name: 'groups:saml_group_links:list_groups_saml_group_links',
  description: 'Lists SAML group links. Get SAML group links for a group',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/saml_group_links',
  },
});
