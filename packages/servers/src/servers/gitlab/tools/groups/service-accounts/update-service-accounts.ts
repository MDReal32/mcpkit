import { defineTool } from '@usemcpkit/core';

export const groupsServiceAccountsUpdateServiceAccounts = defineTool({
  name: 'groups:service_accounts:update_service_accounts',
  description: 'Update an instance service account. Updates a specified instance service account.',
  input: {
    type: 'object',
    properties: {
      user_id: {
        type: 'integer',
        description: 'ID of the service account.',
      },
      name: {
        type: 'string',
        description: 'Name of the user. If omitted when creating a new service account, uses `Service account user`.',
      },
      username: {
        type: 'string',
        description:
          'Username of the user account. If omitted when creating a new service account, generates a name prefixed with `service_account_`.',
      },
      email: {
        type: 'string',
        description:
          'Email address of the user account. If omitted when creating a new service account, generates a no-reply email address. Custom email addresses require confirmation, unless the email confirmation settings are turned off.',
      },
      external: {
        type: 'boolean',
        description: 'Flag indicating the user is an external user',
      },
    },
    required: ['user_id'],
  },
  request: {
    method: 'PATCH',
    path: '/service_accounts/{user_id}',
    body: ['name', 'username', 'email', 'external'],
  },
});
