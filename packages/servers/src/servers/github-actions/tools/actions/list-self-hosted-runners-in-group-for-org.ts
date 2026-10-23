import { defineTool } from '@usemcpkit/core';

export const actionsListSelfHostedRunnersInGroupForOrg = defineTool({
  name: 'actions:list_self_hosted_runners_in_group_for_org',
  description:
    'List self-hosted runners in a group for an organization. Lists self-hosted runners that are in a specific organization group.',
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
    required: ['org', 'runner_group_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/runners',
    query: ['per_page', 'page'],
  },
});
