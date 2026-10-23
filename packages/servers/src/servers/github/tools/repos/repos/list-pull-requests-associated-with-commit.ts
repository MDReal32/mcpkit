import { defineTool } from '@usemcpkit/core';

export const reposReposListPullRequestsAssociatedWithCommit = defineTool({
  name: 'repos:repos:list_pull_requests_associated_with_commit',
  description:
    'List pull requests associated with a commit. Lists the merged pull request that introduced the commit to the repository. If the commit is not present in the default branch, it will return merged and open pull requests associated with the commit.',
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
      commit_sha: {
        type: 'string',
        description: 'The SHA of the commit.',
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
    required: ['owner', 'repo', 'commit_sha'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/commits/{commit_sha}/pulls',
    query: ['per_page', 'page'],
  },
});
