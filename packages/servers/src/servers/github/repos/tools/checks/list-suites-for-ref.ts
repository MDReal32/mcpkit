import { defineTool } from '@usemcpkit/core';

export const checksListSuitesForRef = defineTool({
  name: 'checks:list_suites_for_ref',
  description:
    'List check suites for a Git reference. Lists check suites for a commit `ref`. The `ref` can be a SHA, branch name, or a tag name.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      ref: {
        type: 'string',
        description:
          'The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`). For more information, see "Git References" in the Git documentation.',
      },
      app_id: {
        type: 'integer',
        description: 'Filters check suites by GitHub App `id`.',
      },
      check_name: {
        type: 'string',
        description: 'Returns check runs with the specified `name`.',
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
    required: ['owner', 'repo', 'ref'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/commits/{ref}/check-suites',
    query: ['app_id', 'check_name', 'per_page', 'page'],
  },
});
