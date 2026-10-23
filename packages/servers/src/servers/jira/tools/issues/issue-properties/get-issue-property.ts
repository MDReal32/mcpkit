import { defineTool } from '@usemcpkit/core';

export const issuesIssuePropertiesGetIssueProperty = defineTool({
  name: 'issues:issue_properties:get_issue_property',
  description: "Get issue property. Returns the key and value of an issue's property.",
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
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/properties/{propertyKey}',
  },
});
