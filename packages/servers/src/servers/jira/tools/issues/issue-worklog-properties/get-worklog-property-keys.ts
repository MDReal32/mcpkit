import { defineTool } from '@usemcpkit/core';

export const issuesIssueWorklogPropertiesGetWorklogPropertyKeys = defineTool({
  name: 'issues:issue_worklog_properties:get_worklog_property_keys',
  description: 'Get worklog property keys. Returns the keys of all properties for a worklog.',
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
    },
    required: ['issueIdOrKey', 'worklogId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/worklog/{worklogId}/properties',
  },
});
