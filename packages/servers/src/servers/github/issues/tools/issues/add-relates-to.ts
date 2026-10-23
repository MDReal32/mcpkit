import { defineTool } from '@usemcpkit/core';

export const issuesAddRelatesTo = defineTool({
  name: 'issues:add_relates_to',
  description: 'Add a related issue. You can use the REST API to mark an issue as related to another issue.',
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
      issue_id: {
        type: 'integer',
        description: 'The id of the issue to mark as related to the current issue',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'issue_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/relates_to',
    body: ['issue_id'],
  },
});
