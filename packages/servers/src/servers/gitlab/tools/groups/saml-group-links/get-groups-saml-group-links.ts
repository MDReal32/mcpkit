import { defineTool } from '@usemcpkit/core';

export const groupsSamlGroupLinksGetGroupsSamlGroupLinks = defineTool({
  name: 'groups:saml_group_links:get_groups_saml_group_links',
  description: 'Get SAML group link. Get a SAML group link for the group',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      saml_group_name: {
        type: 'string',
        description: 'Name of the SAML group.',
      },
      provider: {
        type: 'string',
        description:
          'Unique provider name used to disambiguate when multiple links exist with the same name. Required when multiple links exist with the same `saml_group_name`.',
      },
    },
    required: ['id', 'saml_group_name'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/saml_group_links/{saml_group_name}',
    query: ['provider'],
  },
});
