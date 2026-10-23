import { defineTool } from '@usemcpkit/core';

export const issuesIssuePropertiesBulkSetIssueProperty = defineTool({
  name: 'issues:issue_properties:bulk_set_issue_property',
  description: 'Bulk set issue property. Sets a property value on multiple issues.',
  input: {
    type: 'object',
    properties: {
      propertyKey: {
        type: 'string',
        description: 'The key of the property. The maximum length is 255 characters.',
      },
      expression: {
        type: 'string',
        description:
          'EXPERIMENTAL. The Jira expression to calculate the value of the property. The value of the expression must be an object that can be converted to JSON, such as a number, boolean, string, list, or map. The context variables available to the expression are `issue` and `user`. Issues for which the expression returns a value whose JSON representation is longer than 32768 characters are ignored.',
      },
      filter: {
        type: 'object',
        description: 'The bulk operation filter.',
        properties: {
          currentValue: {
            description: 'The value of properties to perform the bulk operation on.',
          },
          entityIds: {
            type: 'array',
            description: 'List of issues to perform the bulk operation on.',
            items: {
              type: 'integer',
            },
          },
          hasProperty: {
            type: 'boolean',
            description:
              'Whether the bulk operation occurs only when the property is present on or absent from an issue.',
          },
        },
      },
      value: {
        description:
          'The value of the property. The value must be a valid, non-empty JSON blob. The maximum length is 32768 characters.',
      },
    },
    required: ['propertyKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issue/properties/{propertyKey}',
    body: ['expression', 'filter', 'value'],
  },
});
