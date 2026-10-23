import { defineTool } from '@usemcpkit/core';

export const issuesLabelsDeleteProjectsLabelsDelete = defineTool({
  name: 'issues:labels:delete_projects_labels_delete',
  description: 'Delete a project label. Deletes a specified label from a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name or ID of the label to delete.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/labels/{name}',
  },
});
