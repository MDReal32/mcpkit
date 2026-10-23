import { defineTool } from '@usemcpkit/core';

export const issuesIssuesAddLabels = defineTool({
  name: 'issues:issues:add_labels',
  description: 'Add labels to an issue. Adds labels to an issue.',
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
      labels: {
        type: 'array',
        description:
          'The labels to add to the issue\'s existing labels. You can also pass an `array` of labels directly, but GitHub recommends passing an object with the `labels` key. To replace all of the labels for an issue, use "Set labels for an issue."',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the label to add.',
            },
            rationale: {
              type: 'string',
              description: 'Optional reasoning for adding this label.',
            },
            suggest: {
              type: 'boolean',
              description:
                'If `true`, the label is stored as a pending suggestion for human review rather than applied directly.',
            },
            confidence: {
              type: 'string',
              description: 'The confidence level for this label choice.',
              enum: ['low', 'medium', 'high'],
            },
          },
        },
      },
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/labels',
    body: ['labels'],
  },
});
