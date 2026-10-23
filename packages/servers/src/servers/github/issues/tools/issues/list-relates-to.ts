import { defineTool } from '@usemcpkit/core';

export const issuesListRelatesTo = defineTool({
  name: 'issues:list_relates_to',
  description:
    'List issues related to an issue. You can use the REST API to list the issues that are related to an issue.',
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
      issue_number: {
        type: 'integer',
        description: 'The number that identifies the issue.',
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
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/relates_to',
    query: ['per_page', 'page'],
  },
});
