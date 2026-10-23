import { defineTool } from '@usemcpkit/core';

export const aiActiveContextDeleteAdminActiveContextDeadQueue = defineTool({
  name: 'ai:active_context:delete_admin_active_context_dead_queue',
  description:
    'Clear the ActiveContext dead queue. Removes all items from the dead queue and returns the number of items cleared.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'DELETE',
    path: '/admin/active_context/dead_queue',
  },
});
