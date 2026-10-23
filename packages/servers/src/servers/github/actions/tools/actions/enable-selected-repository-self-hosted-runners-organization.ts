import { defineTool } from '@usemcpkit/core';

export const actionsEnableSelectedRepositorySelfHostedRunnersOrganization = defineTool({
  name: 'actions:enable_selected_repository_self_hosted_runners_organization',
  description:
    'Add a repository to the list of repositories allowed to use self-hosted runners in an organization. Adds a repository to the list of repositories that are allowed to use self-hosted runners in an organization.',
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
    method: 'PUT',
    path: '/orgs/{org}/actions/permissions/self-hosted-runners/repositories/{repository_id}',
  },
});
