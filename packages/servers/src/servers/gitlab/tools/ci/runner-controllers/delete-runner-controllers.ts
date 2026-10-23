import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllersDeleteRunnerControllers = defineTool({
  name: 'ci:runner_controllers:delete_runner_controllers',
  description: 'Delete a runner controller. Deletes a specified runner controller. Administrators only.',
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
    path: '/runner_controllers/{id}',
  },
});
