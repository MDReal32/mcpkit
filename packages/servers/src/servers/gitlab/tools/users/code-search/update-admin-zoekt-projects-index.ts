import { defineTool } from '@usemcpkit/core';

export const usersCodeSearchUpdateAdminZoektProjectsIndex = defineTool({
  name: 'users:code_search:update_admin_zoekt_projects_index',
  description:
    'Triggers indexing for the specified project. Triggers background indexing of the specified project using the Zoekt search engine.',
  input: {
    type: 'object',
    properties: {
      project_id: {
        type: 'integer',
        description: 'ID of the project to index.',
      },
    },
    required: ['project_id'],
  },
  request: {
    method: 'PUT',
    path: '/admin/zoekt/projects/{project_id}/index',
  },
});
