import { defineTool } from '@usemcpkit/core';

export const actionsActionsAddCustomLabelsToSelfHostedRunnerForOrg = defineTool({
  name: 'actions:actions:add_custom_labels_to_self_hosted_runner_for_org',
  description:
    'Add custom labels to a self-hosted runner for an organization. Adds custom labels to a self-hosted runner configured in an organization.',
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
        description: 'The names of the custom labels to add to the runner.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['org', 'runner_id', 'labels'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/actions/runners/{runner_id}/labels',
    body: ['labels'],
  },
});
