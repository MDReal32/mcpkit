import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllersUpdateRunnerControllers = defineTool({
  name: 'ci:runner_controllers:update_runner_controllers',
  description: 'Update a runner controller. Updates the details of an existing runner controller by its ID.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the runner controller.',
      },
      description: {
        type: 'string',
        description: 'Description of the runner controller.',
      },
      state: {
        type: 'string',
        description: 'State of the runner controller.',
        enum: ['disabled', 'enabled', 'dry_run'],
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/runner_controllers/{id}',
    body: ['description', 'state'],
  },
});
