import { defineTool } from '@usemcpkit/core';

export const metaExperimentsDeleteExperimentsCache = defineTool({
  name: 'meta:experiments:delete_experiments_cache',
  description:
    'Delete cached assignments for an experiment. Removes all cached variant assignments for the experiment with the given cache key. Useful for cleaning up completed experiments whose code has been removed from the codebase.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Cache key of the experiment to clear.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'DELETE',
    path: '/experiments/{name}/cache',
  },
});
