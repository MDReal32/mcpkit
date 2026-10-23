import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllerTokensGetRunnerControllersTokens = defineTool({
  name: 'ci:runner_controller_tokens:get_runner_controllers_tokens',
  description:
    'Retrieve a single runner controller token. Retrieves details of a specified runner controller token by its ID.',
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
    method: 'GET',
    path: '/runner_controllers/{runner_controller_id}/tokens/{id}',
  },
});
