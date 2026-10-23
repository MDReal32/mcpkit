import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllersDeleteRunnerControllersScopesRunners = defineTool({
  name: 'ci:runner_controllers:delete_runner_controllers_scopes_runners',
  description: 'Remove runner scope. Removes a runner scope from a runner controller.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the runner controller.',
      },
      runner_id: {
        type: 'integer',
        description: 'ID of the runner.',
      },
    },
    required: ['id', 'runner_id'],
  },
  request: {
    method: 'DELETE',
    path: '/runner_controllers/{id}/scopes/runners/{runner_id}',
  },
});
