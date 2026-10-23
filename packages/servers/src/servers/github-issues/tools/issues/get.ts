import { defineTool } from '@usemcpkit/core';

export const issuesGet = defineTool({
  name: 'issues:get',
  description:
    'Get an issue. The API returns a `301 Moved Permanently` status if the issue was transferred to another repository. If the issue was transferred to or deleted from a repository where the authenticated user lacks read access, the API returns a `404 Not Found` status. If the issue was deleted from a repository where the authenticated user has read access, the API returns a `410 Gone` status. To receive webhook ev…',
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
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/issues/{issue_number}',
  },
});
