import { defineTool } from '@usemcpkit/core';

export const issuesIssuesDeleteIssue = defineTool({
  name: 'issues:issues:delete_issue',
  description: 'Delete issue. Deletes an issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      deleteSubtasks: {
        type: 'string',
        default: 'false',
        enum: ['true', 'false'],
        description: "Whether the issue's subtasks are deleted when the issue is deleted.",
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issue/{issueIdOrKey}',
    query: ['deleteSubtasks'],
  },
});
