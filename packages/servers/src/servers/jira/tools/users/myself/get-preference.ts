import { defineTool } from '@usemcpkit/core';

export const usersMyselfGetPreference = defineTool({
  name: 'users:myself:get_preference',
  description: 'Get preference. Returns the value of a preference of the current user.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'The key of the preference.',
      },
    },
    required: ['key'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/mypreferences',
    query: ['key'],
  },
});
