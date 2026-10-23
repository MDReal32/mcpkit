import { defineTool } from '@usemcpkit/core';

export const issuesRemoveLabel = defineTool({
  name: 'issues:remove_label',
  description:
    'Remove a label from an issue. Removes the specified label from the issue, and returns the remaining labels on the issue. This endpoint returns a `404 Not Found` status if the label does not exist.',
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
      name: {
        type: 'string',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/labels/{name}',
  },
});
