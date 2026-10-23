import { defineTool } from '@usemcpkit/core';

export const projectsHooksDeleteGroupsHooks = defineTool({
  name: 'projects:hooks:delete_groups_hooks',
  description:
    'Delete a group hook. Deletes a hook from a group. This is an idempotent method and can be called multiple times. Either the hook is available or not.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      hook_id: {
        type: 'integer',
        description: 'ID of the group webhook.',
      },
    },
    required: ['id', 'hook_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/hooks/{hook_id}',
  },
});
