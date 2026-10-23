import { defineTool } from '@usemcpkit/core';

export const reposChecksListForRef = defineTool({
  name: 'repos:checks:list_for_ref',
  description:
    'List check runs for a Git reference. Lists check runs for a commit ref. The `ref` can be a SHA, branch name, or a tag name.',
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
      check_name: {
        type: 'string',
        description: 'Returns check runs with the specified `name`.',
      },
      status: {
        type: 'string',
        enum: ['queued', 'in_progress', 'completed'],
        description: 'Returns check runs with the specified `status`.',
      },
      filter: {
        type: 'string',
        default: 'latest',
        enum: ['latest', 'all'],
        description:
          'Filters check runs by their `completed_at` timestamp. `latest` returns the most recent check runs.',
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
      app_id: {
        type: 'integer',
      },
    },
    required: ['owner', 'repo', 'ref'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/commits/{ref}/check-runs',
    query: ['check_name', 'status', 'filter', 'per_page', 'page', 'app_id'],
  },
});
