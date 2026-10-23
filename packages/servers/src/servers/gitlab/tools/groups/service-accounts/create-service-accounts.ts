import { defineTool } from '@usemcpkit/core';

export const groupsServiceAccountsCreateServiceAccounts = defineTool({
  name: 'groups:service_accounts:create_service_accounts',
  description: 'Create an instance service account. Creates an instance service account.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the user. If omitted, uses `Service account user`.',
      },
      username: {
        type: 'string',
        description: 'Username of the user account. If omitted, generates a name prefixed with `service_account_`.',
      },
      email: {
        type: 'string',
        description:
          'Email address of the user account. If omitted, generates a no-reply email address. Custom email addresses require confirmation, unless the email confirmation settings are turned off.',
      },
      external: {
        type: 'boolean',
        description: 'Flag indicating the user is an external user',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/service_accounts',
    body: ['name', 'username', 'email', 'external'],
  },
});
