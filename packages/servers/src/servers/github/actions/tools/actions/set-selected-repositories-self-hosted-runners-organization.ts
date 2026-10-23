import { defineTool } from '@usemcpkit/core';

export const actionsSetSelectedRepositoriesSelfHostedRunnersOrganization = defineTool({
  name: 'actions:set_selected_repositories_self_hosted_runners_organization',
  description:
    'Set repositories allowed to use self-hosted runners in an organization. Sets repositories that are allowed to use self-hosted runners in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      selected_repository_ids: {
        type: 'array',
        description: 'IDs of repositories that can use repository-level self-hosted runners',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['org', 'selected_repository_ids'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/permissions/self-hosted-runners/repositories',
    body: ['selected_repository_ids'],
  },
});
