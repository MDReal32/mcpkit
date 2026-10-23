import { defineTool } from '@usemcpkit/core';

export const collaborationFiltersChangeFilterOwner = defineTool({
  name: 'collaboration:filters:change_filter_owner',
  description: 'Change filter owner. Changes the owner of the filter.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the filter to update.',
      },
      accountId: {
        type: 'string',
        description: 'The account ID of the new owner.',
      },
    },
    required: ['id', 'accountId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/filter/{id}/owner',
    body: ['accountId'],
  },
});
