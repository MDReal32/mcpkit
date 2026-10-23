import { defineTool } from '@usemcpkit/core';

export const issuesLabelsDeleteGroupsLabels = defineTool({
  name: 'issues:labels:delete_groups_labels',
  description: 'Delete a group label. Deletes a specified group label.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      name: {
        type: 'string',
        description: 'Name of the label to delete.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/labels',
    query: ['name'],
  },
});
