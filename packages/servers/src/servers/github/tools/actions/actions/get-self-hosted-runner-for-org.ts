import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetSelfHostedRunnerForOrg = defineTool({
  name: 'actions:actions:get_self_hosted_runner_for_org',
  description:
    'Get a self-hosted runner for an organization. Gets a specific self-hosted runner configured in an organization.',
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
    },
    required: ['org', 'runner_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/runners/{runner_id}',
  },
});
