import { defineTool } from '@usemcpkit/core';

export const metaExperimentsGetExperimentsAssignments = defineTool({
  name: 'meta:experiments:get_experiments_assignments',
  description:
    'Get current variant assignment for an experiment context. Returns the currently cached variant assignment for the given experiment and context. Defaults to current user if no context is provided.',
  input: {
    type: 'object',
    properties: {
      experiment_name: {
        type: 'string',
        description: 'The experiment name',
      },
      context: {
        type: 'object',
        description:
          'Context parameters (user, namespace, project). Pass every key the experiment declares in `context_keys`. Experiments can declare multiple keys. An actor context is resolved from the user. The user defaults to the current user.',
      },
    },
    required: ['experiment_name'],
  },
  request: {
    method: 'GET',
    path: '/experiments/{experiment_name}/assignments',
    query: ['context'],
  },
});
