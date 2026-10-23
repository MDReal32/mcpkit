import { defineTool } from '@usemcpkit/core';

export const groupsProviderIdentitiesGetGroupsScimIdentities = defineTool({
  name: 'groups:provider_identities:get_groups_scim_identities',
  description: 'Retrieve SCIM identities for a group. Retrieves SCIM identities for a group.',
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
    path: '/groups/{id}/scim/identities',
  },
});
