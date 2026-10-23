import { defineTool } from '@usemcpkit/core';

export const actionsActionsListSelfHostedRunnersForOrg = defineTool({
  name: 'actions:actions:list_self_hosted_runners_for_org',
  description:
    'List self-hosted runners for an organization. Lists all self-hosted runners configured in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of a self-hosted runner.',
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
    path: '/orgs/{org}/actions/runners',
    query: ['name', 'per_page', 'page'],
  },
});
