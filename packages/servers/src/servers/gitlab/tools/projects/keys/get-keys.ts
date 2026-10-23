import { defineTool } from '@usemcpkit/core';

export const projectsKeysGetKeys = defineTool({
  name: 'projects:keys:get_keys',
  description: 'Retrieve user by SSH key ID. Retrieves user by SSH key ID. Administrators only.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the SSH key.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/keys/{id}',
  },
});
