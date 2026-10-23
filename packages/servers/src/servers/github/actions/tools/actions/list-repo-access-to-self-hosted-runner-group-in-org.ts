import { defineTool } from '@usemcpkit/core';

export const actionsListRepoAccessToSelfHostedRunnerGroupInOrg = defineTool({
  name: 'actions:list_repo_access_to_self_hosted_runner_group_in_org',
  description:
    'List repository access to a self-hosted runner group in an organization. Lists the repositories with access to a self-hosted runner group configured in an organization.',
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
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org', 'runner_group_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories',
    query: ['page', 'per_page'],
  },
});
