import { defineTool } from '@usemcpkit/core';

export const actionsActionsRemoveCustomLabelFromSelfHostedRunnerForRepo = defineTool({
  name: 'actions:actions:remove_custom_label_from_self_hosted_runner_for_repo',
  description:
    'Remove a custom label from a self-hosted runner for a repository. Remove a custom label from a self-hosted runner configured in a repository. Returns the remaining labels from the runner.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      runner_id: {
        type: 'integer',
        description: 'Unique identifier of the self-hosted runner.',
      },
      name: {
        type: 'string',
        description: "The name of a self-hosted runner's custom label.",
      },
    },
    required: ['owner', 'repo', 'runner_id', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}',
  },
});
