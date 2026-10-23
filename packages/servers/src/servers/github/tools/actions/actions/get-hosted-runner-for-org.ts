import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetHostedRunnerForOrg = defineTool({
  name: 'actions:actions:get_hosted_runner_for_org',
  description:
    'Get a GitHub-hosted runner for an organization. Gets a GitHub-hosted runner configured in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      hosted_runner_id: {
        type: 'integer',
        description: 'Unique identifier of the GitHub-hosted runner.',
      },
    },
    required: ['org', 'hosted_runner_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/hosted-runners/{hosted_runner_id}',
  },
});
