import { defineTool } from '@usemcpkit/core';

export const reposGetCombinedStatusForRef = defineTool({
  name: 'repos:get_combined_status_for_ref',
  description:
    'Get the combined status for a specific reference. Users with pull access in a repository can access a combined view of commit statuses for a given ref. The ref can be a SHA, a branch name, or a tag name.',
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
    path: '/repos/{owner}/{repo}/commits/{ref}/status',
    query: ['per_page', 'page'],
  },
});
