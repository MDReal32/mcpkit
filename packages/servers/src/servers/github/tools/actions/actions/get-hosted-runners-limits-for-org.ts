import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetHostedRunnersLimitsForOrg = defineTool({
  name: 'actions:actions:get_hosted_runners_limits_for_org',
  description:
    'Get limits on GitHub-hosted runners for an organization. Get the GitHub-hosted runners limits for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/hosted-runners/limits',
  },
});
