import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypesUpdateIssueType = defineTool({
  name: 'workflows:issue_types:update_issue_type',
  description: 'Update issue type. Updates the issue type.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the issue type.',
      },
      avatarId: {
        type: 'integer',
        description: 'The ID of an issue type avatar. This can be obtained be obtained from the following endpoints:',
      },
      description: {
        type: 'string',
        description: 'The description of the issue type.',
      },
      name: {
        type: 'string',
        description: 'The unique name for the issue type. The maximum length is 60 characters.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issuetype/{id}',
    body: ['avatarId', 'description', 'name'],
  },
});
