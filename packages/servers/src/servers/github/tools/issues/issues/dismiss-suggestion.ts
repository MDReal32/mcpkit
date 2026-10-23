import { defineTool } from '@usemcpkit/core';

export const issuesIssuesDismissSuggestion = defineTool({
  name: 'issues:issues:dismiss_suggestion',
  description:
    'Dismiss an issue suggestion. Dismisses a pending suggestion on an issue. Transitions the suggestion to `dismissed` without applying any change or creating a timeline event.',
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
      suggestion_id: {
        type: 'integer',
        description: 'The unique identifier of the suggestion.',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'suggestion_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/suggestions/{suggestion_id}/dismiss',
  },
});
