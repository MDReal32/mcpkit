import { defineTool } from '@usemcpkit/core';

export const aiActiveContextUpdateAdminActiveContextCodeEnabledNamespaces = defineTool({
  name: 'ai:active_context:update_admin_active_context_code_enabled_namespaces',
  description:
    'Update enabled namespace state. Transitions the indexing state of an enabled namespace to pending or ready.',
  input: {
    type: 'object',
    properties: {
      namespace_id: {
        type: 'string',
        description: 'ID or path of the namespace.',
      },
      state: {
        type: 'string',
        description: 'Indexing state to transition the enabled namespace to.',
        enum: ['pending', 'ready'],
      },
      connection_id: {
        type: 'integer',
        description: 'ID of the connection. If omitted, defaults to the active connection.',
      },
    },
    required: ['namespace_id', 'state'],
  },
  request: {
    method: 'PUT',
    path: '/admin/active_context/code/enabled_namespaces',
    body: ['namespace_id', 'state', 'connection_id'],
  },
});
