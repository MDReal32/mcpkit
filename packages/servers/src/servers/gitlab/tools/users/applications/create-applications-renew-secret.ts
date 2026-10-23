import { defineTool } from '@usemcpkit/core';

export const usersApplicationsCreateApplicationsRenewSecret = defineTool({
  name: 'users:applications:create_applications_renew_secret',
  description: 'Renew an application secret. Renew the secret of a specific application',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the application. Not the `application_id`, which is the OAuth client ID.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/applications/{id}/renew-secret',
  },
});
