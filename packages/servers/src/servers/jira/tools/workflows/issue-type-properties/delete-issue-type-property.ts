import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypePropertiesDeleteIssueTypeProperty = defineTool({
  name: 'workflows:issue_type_properties:delete_issue_type_property',
  description: 'Delete issue type property. Deletes the issue type property.',
  input: {
    type: 'object',
    properties: {
      issueTypeId: {
        type: 'string',
        description: 'The ID of the issue type.',
      },
      propertyKey: {
        type: 'string',
        description:
          'The key of the property. Use Get issue type property keys to get a list of all issue type property keys.',
      },
    },
    required: ['issueTypeId', 'propertyKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issuetype/{issueTypeId}/properties/{propertyKey}',
  },
});
