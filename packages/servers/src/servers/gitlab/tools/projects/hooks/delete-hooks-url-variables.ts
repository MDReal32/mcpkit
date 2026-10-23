import { defineTool } from '@usemcpkit/core';

export const projectsHooksDeleteHooksUrlVariables = defineTool({
  name: 'projects:hooks:delete_hooks_url_variables',
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
    },
    required: ['hook_id', 'key'],
  },
  request: {
    method: 'DELETE',
    path: '/hooks/{hook_id}/url_variables/{key}',
  },
});
