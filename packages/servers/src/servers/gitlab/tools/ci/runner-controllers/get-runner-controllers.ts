import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllersGetRunnerControllers = defineTool({
  name: 'ci:runner_controllers:get_runner_controllers',
  description: 'Retrieve a single runner controller. Retrieves details of a specified runner controller.',
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
    method: 'GET',
    path: '/runner_controllers/{id}',
  },
});
