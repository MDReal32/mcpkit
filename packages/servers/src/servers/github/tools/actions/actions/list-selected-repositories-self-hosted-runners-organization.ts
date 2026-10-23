import { defineTool } from '@usemcpkit/core';

export const actionsActionsListSelectedRepositoriesSelfHostedRunnersOrganization = defineTool({
  name: 'actions:actions:list_selected_repositories_self_hosted_runners_organization',
  description:
    'List repositories allowed to use self-hosted runners in an organization. Lists repositories that are allowed to use self-hosted runners in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/permissions/self-hosted-runners/repositories',
    query: ['per_page', 'page'],
  },
});
