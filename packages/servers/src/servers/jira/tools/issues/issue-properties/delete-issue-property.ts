import { defineTool } from '@usemcpkit/core';

export const issuesIssuePropertiesDeleteIssueProperty = defineTool({
  name: 'issues:issue_properties:delete_issue_property',
  description: "Delete issue property. Deletes an issue's property.",
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The key or ID of the issue.',
      },
      propertyKey: {
        type: 'string',
        description: 'The key of the property.',
      },
    },
    required: ['issueIdOrKey', 'propertyKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issue/{issueIdOrKey}/properties/{propertyKey}',
  },
});
