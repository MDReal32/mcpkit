import { defineTool } from '@usemcpkit/core';

export const groupsServiceAccountsCreateProjectsServiceAccounts = defineTool({
  name: 'groups:service_accounts:create_projects_service_accounts',
  description: 'Create a project service account. Creates a service account in a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the user. If omitted, uses `Service account user`.',
      },
      username: {
        type: 'string',
        description:
          'Username of the user account. If omitted, generates a name prefixed with `service_account_project_`.',
      },
      email: {
        type: 'string',
        description:
          'Email address of the user account. If omitted, generates an email address prefixed with `service_account_project_`. Custom email addresses require confirmation, unless the group has a matching verified domain or email confirmation settings are turned off.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/service_accounts',
    body: ['name', 'username', 'email'],
  },
});
