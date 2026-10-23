import { defineTool } from '@usemcpkit/core';

export const projectsHooksDeleteProjectsHooksUrlVariables = defineTool({
  name: 'projects:hooks:delete_projects_hooks_url_variables',
  description: 'Delete a URL variable. Deletes a URL variable from a specified webhook.',
  input: {
    type: 'object',
    properties: {
      hook_id: {
        type: 'integer',
        description: 'ID of the hook.',
      },
      key: {
        type: 'string',
        description: 'Key of the URL variable.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['hook_id', 'key', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/hooks/{hook_id}/url_variables/{key}',
  },
});
