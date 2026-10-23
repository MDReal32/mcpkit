import { defineTool } from '@usemcpkit/core';

export const reposListCommentsForCommit = defineTool({
  name: 'repos:list_comments_for_commit',
  description: 'List commit comments. Lists the comments for a specified commit.',
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
    path: '/repos/{owner}/{repo}/commits/{commit_sha}/comments',
    query: ['per_page', 'page'],
  },
});
