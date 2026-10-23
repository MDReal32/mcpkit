import { defineTool } from '@usemcpkit/core';

export const adminBatchedBackgroundMigrationsUpdateAdminBatchedBackgroundMigrationsPause = defineTool({
  name: 'admin:batched_background_migrations:update_admin_batched_background_migrations_pause',
  description: 'Pause a batched background migration. Pauses an active batched background migration temporarily.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the batched background migration.',
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
    path: '/admin/batched_background_migrations/{id}/pause',
    body: ['database'],
  },
});
