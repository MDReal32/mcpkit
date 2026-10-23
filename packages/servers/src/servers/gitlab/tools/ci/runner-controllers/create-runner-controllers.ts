import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllersCreateRunnerControllers = defineTool({
  name: 'ci:runner_controllers:create_runner_controllers',
  description: 'Register a runner controller. Registers a runner controller.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'Description of the runner controller.',
      },
      state: {
        type: 'string',
        description: 'State of the runner controller.',
        default: 'disabled',
        enum: ['disabled', 'enabled', 'dry_run'],
      },
    },
  },
  request: {
    method: 'POST',
    path: '/runner_controllers',
    body: ['description', 'state'],
  },
});
