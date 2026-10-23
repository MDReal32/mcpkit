import { defineTool } from '@usemcpkit/core';

export const ciRunnersDeleteRunners = defineTool({
  name: 'ci:runners:delete_runners',
  description: 'Delete a runner. Deletes a specified runner.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the runner.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/runners/{id}',
  },
});
