import { defineTool } from '@usemcpkit/core';

export const usersMyselfGetCurrentUser = defineTool({
  name: 'users:myself:get_current_user',
  description: 'Get current user. Returns details for the current user.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about user in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/myself',
    query: ['expand'],
  },
});
