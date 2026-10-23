import { defineTool } from '@usemcpkit/core';

export const groupsServiceAccountsGetGroupsServiceAccounts = defineTool({
  name: 'groups:service_accounts:get_groups_service_accounts',
  description: 'Get a single group service account. Gets a specified service account in a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      user_id: {
        type: 'integer',
        description: 'ID of the service account.',
      },
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/service_accounts/{user_id}',
  },
});
