import { defineTool } from '@usemcpkit/core';

export const issuesIssuePropertiesBulkSetIssuePropertiesByIssue = defineTool({
  name: 'issues:issue_properties:bulk_set_issue_properties_by_issue',
  description:
    'Bulk set issue properties by issue. Sets or updates entity property values on issues. Up to 10 entity properties can be specified for each issue and up to 100 issues included in the request.',
  input: {
    type: 'object',
    properties: {
      issues: {
        type: 'array',
        description: 'A list of issue IDs and their respective properties.',
        items: {
          type: 'object',
          description: 'An issue ID with entity property values. See Entity properties for more information.',
          properties: {
            issueID: {
              type: 'integer',
              description: 'The ID of the issue.',
            },
            properties: {
              type: 'object',
              description:
                'Entity properties to set on the issue. The maximum length of an issue property value is 32768 characters.',
            },
          },
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/properties/multi',
    body: ['issues'],
  },
});
