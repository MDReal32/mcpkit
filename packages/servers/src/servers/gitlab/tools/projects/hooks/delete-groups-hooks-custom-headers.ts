import { defineTool } from '@usemcpkit/core';

export const projectsHooksDeleteGroupsHooksCustomHeaders = defineTool({
  name: 'projects:hooks:delete_groups_hooks_custom_headers',
  description: 'Delete a custom header. Deletes a custom header from a specified webhook.',
  input: {
    type: 'object',
    properties: {
      hook_id: {
        type: 'integer',
        description: 'ID of the hook.',
      },
      key: {
        type: 'string',
        description: 'Name of the custom header.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['hook_id', 'key', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/hooks/{hook_id}/custom_headers/{key}',
  },
});
