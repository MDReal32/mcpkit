import { defineTool } from '@usemcpkit/core';

export const aiActiveContextUpdateAdminActiveContextConnectionsDeactivate = defineTool({
  name: 'ai:active_context:update_admin_active_context_connections_deactivate',
  description:
    'Deactivate an ActiveContext connection. Deactivates the specified connection. This asynchronously drops indexed data for the connection and deletes the connection record.',
  input: {
    type: 'object',
    properties: {
      connection_id: {
        type: 'integer',
        description: 'ID of the connection. If omitted, defaults to the active connection.',
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/admin/active_context/connections/deactivate',
    body: ['connection_id'],
  },
});
