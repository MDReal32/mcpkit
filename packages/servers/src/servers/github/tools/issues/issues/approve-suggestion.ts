import { defineTool } from '@usemcpkit/core';

export const issuesIssuesApproveSuggestion = defineTool({
  name: 'issues:issues:approve_suggestion',
  description:
    'Approve an issue suggestion. Approves a pending suggestion on an issue. Applies the proposed change (creating the corresponding timeline event), transitions the suggestion to `approved`, and dismisses any competing pending suggestions for the same change.',
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
    path: '/repos/{owner}/{repo}/issues/{issue_number}/suggestions/{suggestion_id}/approve',
  },
});
