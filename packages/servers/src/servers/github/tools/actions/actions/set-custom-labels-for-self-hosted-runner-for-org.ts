import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetCustomLabelsForSelfHostedRunnerForOrg = defineTool({
  name: 'actions:actions:set_custom_labels_for_self_hosted_runner_for_org',
  description:
    'Set custom labels for a self-hosted runner for an organization. Remove all previous custom labels and set the new custom labels for a specific self-hosted runner configured in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      runner_id: {
        type: 'integer',
        description: 'Unique identifier of the self-hosted runner.',
      },
      labels: {
        type: 'array',
        description:
          'The names of the custom labels to set for the runner. You can pass an empty array to remove all custom labels.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['org', 'runner_id', 'labels'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/runners/{runner_id}/labels',
    body: ['labels'],
  },
});
