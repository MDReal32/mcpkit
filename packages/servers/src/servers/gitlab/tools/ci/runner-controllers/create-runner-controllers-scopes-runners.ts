import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllersCreateRunnerControllersScopesRunners = defineTool({
  name: 'ci:runner_controllers:create_runner_controllers_scopes_runners',
  description:
    'Add runner scope. Adds a runner scope to a runner controller. When added, the runner controller evaluates jobs only for a specified runner. A runner controller with an instance scope cannot have runner scopes. Remove the instance scope before adding runner scopes.',
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
    method: 'POST',
    path: '/runner_controllers/{id}/scopes/runners/{runner_id}',
  },
});
