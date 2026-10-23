import { defineTool } from '@usemcpkit/core';

export const actionsActionsListLabelsForSelfHostedRunnerForRepo = defineTool({
  name: 'actions:actions:list_labels_for_self_hosted_runner_for_repo',
  description:
    'List labels for a self-hosted runner for a repository. Lists all labels for a self-hosted runner configured in a repository.',
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
    },
    required: ['owner', 'repo', 'runner_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runners/{runner_id}/labels',
  },
});
