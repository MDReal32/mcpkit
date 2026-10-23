import { defineTool } from '@usemcpkit/core';

export const actionsAddCustomLabelsToSelfHostedRunnerForRepo = defineTool({
  name: 'actions:add_custom_labels_to_self_hosted_runner_for_repo',
  description:
    'Add custom labels to a self-hosted runner for a repository. Adds custom labels to a self-hosted runner configured in a repository.',
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
      labels: {
        type: 'array',
        description: 'The names of the custom labels to add to the runner.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'runner_id', 'labels'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/actions/runners/{runner_id}/labels',
    body: ['labels'],
  },
});
