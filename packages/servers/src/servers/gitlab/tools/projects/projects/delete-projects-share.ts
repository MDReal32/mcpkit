import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectsShare = defineTool({
  name: 'projects:projects:delete_projects_share',
  description: 'Delete a shared project link in a group. Deletes a shared project link in a group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      group_id: {
        type: 'integer',
        description: 'ID of the shared group.',
      },
    },
    required: ['id', 'group_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/share/{group_id}',
  },
});
