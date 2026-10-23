import { defineTool } from '@usemcpkit/core';

export const actionsDeleteSelfHostedRunnerFromOrg = defineTool({
  name: 'actions:delete_self_hosted_runner_from_org',
  description:
    'Delete a self-hosted runner from an organization. Forces the removal of a self-hosted runner from an organization. You can use this endpoint to completely remove the runner when the machine you were using no longer exists.',
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
    method: 'DELETE',
    path: '/orgs/{org}/actions/runners/{runner_id}',
  },
});
