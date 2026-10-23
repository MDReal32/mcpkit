import { defineTool } from '@usemcpkit/core';

export const projectsHooksDeleteHooks = defineTool({
  name: 'projects:hooks:delete_hooks',
  description: 'Delete a system hook. Deletes a specified system hook. Administrators only.',
  input: {
    type: 'object',
    properties: {
      hook_id: {
        type: 'integer',
        description: 'ID of the system hook.',
      },
    },
    required: ['hook_id'],
  },
  request: {
    method: 'DELETE',
    path: '/hooks/{hook_id}',
  },
});
