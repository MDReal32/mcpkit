import { defineTool } from '@usemcpkit/core';

export const groupsProviderIdentitiesGetGroupsSamlIdentities = defineTool({
  name: 'groups:provider_identities:get_groups_saml_identities',
  description: 'Retrieve SAML identities for a group. Retrieves SAML identities for a group.',
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
    path: '/groups/{id}/saml/identities',
  },
});
