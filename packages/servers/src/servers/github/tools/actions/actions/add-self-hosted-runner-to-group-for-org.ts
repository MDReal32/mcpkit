import { defineTool } from '@usemcpkit/core';

export const actionsActionsAddSelfHostedRunnerToGroupForOrg = defineTool({
  name: 'actions:actions:add_self_hosted_runner_to_group_for_org',
  description:
    'Add a self-hosted runner to a group for an organization. Adds a self-hosted runner to a runner group configured in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      runner_group_id: {
        type: 'integer',
        description: 'Unique identifier of the self-hosted runner group.',
      },
      runner_id: {
        type: 'integer',
        description: 'Unique identifier of the self-hosted runner.',
      },
    },
    required: ['org', 'runner_group_id', 'runner_id'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}',
  },
});
