import { defineTool } from '@usemcpkit/core';

export const issuesPullsListCommits = defineTool({
  name: 'issues:pulls:list_commits',
  description:
    'List commits on a pull request. Lists a maximum of 250 commits for a pull request. To receive a complete commit list for pull requests with more than 250 commits, use the List commits endpoint.',
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
      pull_number: {
        type: 'integer',
        description: 'The number that identifies the pull request.',
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
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/commits',
    query: ['per_page', 'page'],
  },
});
