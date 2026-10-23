import { defineTool } from '@usemcpkit/core';

export const usersApplicationsDeleteApplications = defineTool({
  name: 'users:applications:delete_applications',
  description: 'Delete an application. Delete a specific application',
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
    method: 'DELETE',
    path: '/applications/{id}',
  },
});
