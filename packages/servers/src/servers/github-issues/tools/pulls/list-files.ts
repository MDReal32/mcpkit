import { defineTool } from '@usemcpkit/core';

export const pullsListFiles = defineTool({
  name: 'pulls:list_files',
  description: 'List pull requests files. Lists the files in a specified pull request.',
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
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/files',
    query: ['per_page', 'page'],
  },
});
