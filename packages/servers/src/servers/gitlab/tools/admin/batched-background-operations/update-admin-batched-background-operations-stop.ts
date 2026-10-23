import { defineTool } from '@usemcpkit/core';

export const adminBatchedBackgroundOperationsUpdateAdminBatchedBackgroundOperationsStop = defineTool({
  name: 'admin:batched_background_operations:update_admin_batched_background_operations_stop',
  description: 'Stop a batched background operation. This feature was introduced in GitLab 19.2.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the batched background operation.',
      },
      database: {
        type: 'string',
        description: 'Name of the database.',
        default: 'main',
        enum: ['main', 'ci', 'sec', 'embedding', 'geo'],
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/admin/batched_background_operations/{id}/stop',
    body: ['database'],
  },
});
