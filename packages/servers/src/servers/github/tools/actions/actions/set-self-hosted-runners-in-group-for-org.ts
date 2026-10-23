import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetSelfHostedRunnersInGroupForOrg = defineTool({
  name: 'actions:actions:set_self_hosted_runners_in_group_for_org',
  description:
    'Set self-hosted runners in a group for an organization. Replaces the list of self-hosted runners that are part of an organization runner group.',
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
      runners: {
        type: 'array',
        description: 'List of runner IDs to add to the runner group.',
        items: {
          type: 'integer',
          description: 'Unique identifier of the runner.',
        },
      },
    },
    required: ['org', 'runner_group_id', 'runners'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/runners',
    body: ['runners'],
  },
});
