import { defineTool } from '@usemcpkit/core';

export const ciRunnerControllerTokensDeleteRunnerControllersTokens = defineTool({
  name: 'ci:runner_controller_tokens:delete_runner_controllers_tokens',
  description: 'Revoke a runner controller token. Revokes an existing runner controller token.',
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
    method: 'DELETE',
    path: '/runner_controllers/{runner_controller_id}/tokens/{id}',
  },
});
