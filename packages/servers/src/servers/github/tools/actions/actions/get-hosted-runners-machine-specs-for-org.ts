import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetHostedRunnersMachineSpecsForOrg = defineTool({
  name: 'actions:actions:get_hosted_runners_machine_specs_for_org',
  description:
    'Get GitHub-hosted runners machine specs for an organization. Get the list of machine specs available for GitHub-hosted runners for an organization.',
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
    path: '/orgs/{org}/actions/hosted-runners/machine-sizes',
  },
});
