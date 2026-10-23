import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllerTokensCreateRunnerControllersTokensRotate = defineTool({
  name: 'ci:runner_controller_tokens:create_runner_controllers_tokens_rotate',
  description: 'Rotate a runner controller token. Rotates an existing runner controller token.',
  input: {
    type: 'object',
    properties: {
      runner_controller_id: {
        type: 'integer',
        description: 'ID of the runner controller.',
      },
      id: {
        type: 'integer',
        description: 'ID of the runner controller token.',
      },
    },
    required: ['runner_controller_id', 'id'],
  },
  request: {
    method: 'POST',
    path: '/runner_controllers/{runner_controller_id}/tokens/{id}/rotate',
  },
});
