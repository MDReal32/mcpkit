import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypesCreateIssueType = defineTool({
  name: 'workflows:issue_types:create_issue_type',
  description: 'Create issue type. Creates an issue type.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the issue type.',
      },
      hierarchyLevel: {
        type: 'integer',
        description: 'The hierarchy level of the issue type. Use:',
      },
      name: {
        type: 'string',
        description: 'The unique name for the issue type. The maximum length is 60 characters.',
      },
      type: {
        type: 'string',
        description: 'Deprecated. Use `hierarchyLevel` instead. See the deprecation notice for details.',
        enum: ['subtask', 'standard'],
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issuetype',
    body: ['description', 'hierarchyLevel', 'name', 'type'],
  },
});
