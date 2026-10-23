import { defineTool } from '@usemcpkit/core';

export const issuesIssuesListComments = defineTool({
  name: 'issues:issues:list_comments',
  description:
    'List issue comments. You can use the REST API to list comments on issues and pull requests. Every pull request is an issue, but not every issue is a pull request.',
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
      since: {
        type: 'string',
        description:
          'Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
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
    path: '/repos/{owner}/{repo}/issues/{issue_number}/comments',
    query: ['since', 'per_page', 'page'],
  },
});
