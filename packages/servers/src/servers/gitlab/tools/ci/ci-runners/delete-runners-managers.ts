import { defineTool } from '@usemcpkit/core';

export const ciCiRunnersDeleteRunnersManagers = defineTool({
  name: 'ci:ci_runners:delete_runners_managers',
  description:
    'Delete a registered runner manager. Deletes a runner manager identified by the runner authentication token and system ID.',
  input: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'Authentication token of the runner.',
      },
      system_id: {
        type: 'string',
        description: 'System identifier of the runner.',
      },
    },
    required: ['token', 'system_id'],
  },
  request: {
    method: 'DELETE',
    path: '/runners/managers',
    query: ['token', 'system_id'],
  },
});
