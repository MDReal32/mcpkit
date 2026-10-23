import { defineTool } from '@usemcpkit/core';

export const issuesIssueWorklogPropertiesGetWorklogProperty = defineTool({
  name: 'issues:issue_worklog_properties:get_worklog_property',
  description: 'Get worklog property. Returns the value of a worklog property.',
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
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}',
  },
});
