import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllersDeleteRunnerControllersScopesInstance = defineTool({
  name: 'ci:runner_controllers:delete_runner_controllers_scopes_instance',
  description: 'Remove instance scope. Removes an instance scope from a runner controller.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the runner controller.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/runner_controllers/{id}/scopes/instance',
  },
});
