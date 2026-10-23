import { defineTool } from '@usemcpkit/core';

export const actionsActionsDisableSelectedRepositorySelfHostedRunnersOrganization = defineTool({
  name: 'actions:actions:disable_selected_repository_self_hosted_runners_organization',
  description:
    'Remove a repository from the list of repositories allowed to use self-hosted runners in an organization. Removes a repository from the list of repositories that are allowed to use self-hosted runners in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      repository_id: {
        type: 'integer',
        description: 'The unique identifier of the repository.',
      },
    },
    required: ['org', 'repository_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/actions/permissions/self-hosted-runners/repositories/{repository_id}',
  },
});
