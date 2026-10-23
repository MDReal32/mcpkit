import { defineTool } from '@usemcpkit/core';

export const issuesIssueWorklogsBulkDeleteWorklogs = defineTool({
  name: 'issues:issue_worklogs:bulk_delete_worklogs',
  description:
    'Bulk delete worklogs. Deletes a list of worklogs from an issue. This is an experimental API with limitations:',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      adjustEstimate: {
        type: 'string',
        default: 'auto',
        enum: ['leave', 'auto'],
        description: "Defines how to update the issue's time estimate, the options are:",
      },
      overrideEditableFlag: {
        type: 'boolean',
        default: false,
        description:
          'Whether the work log entries should be removed to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag.',
      },
      ids: {
        type: 'array',
        description: 'A list of worklog IDs.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['issueIdOrKey', 'ids'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issue/{issueIdOrKey}/worklog',
    query: ['adjustEstimate', 'overrideEditableFlag'],
    body: ['ids'],
  },
});
