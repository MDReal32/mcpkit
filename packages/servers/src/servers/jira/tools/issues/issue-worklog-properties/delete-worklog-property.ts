import { defineTool } from '@usemcpkit/core';

export const issuesIssueWorklogPropertiesDeleteWorklogProperty = defineTool({
  name: 'issues:issue_worklog_properties:delete_worklog_property',
  description: 'Delete worklog property. Deletes a worklog property.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      worklogId: {
        type: 'string',
        description: 'The ID of the worklog.',
      },
      propertyKey: {
        type: 'string',
        description: 'The key of the property.',
      },
    },
    required: ['issueIdOrKey', 'worklogId', 'propertyKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}',
  },
});
