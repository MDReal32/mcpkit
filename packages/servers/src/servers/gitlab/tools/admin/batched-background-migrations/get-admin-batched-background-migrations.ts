import { defineTool } from '@usemcpkit/core';

export const adminBatchedBackgroundMigrationsGetAdminBatchedBackgroundMigrations = defineTool({
  name: 'admin:batched_background_migrations:get_admin_batched_background_migrations',
  description:
    'Retrieve a batched background migration. Fetches details of a specific batched migration, with optional filtering by database target.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the batched background migration.',
      },
      database: {
        type: 'string',
        default: 'main',
        enum: ['main', 'ci', 'sec', 'embedding', 'geo'],
        description: 'Name of the database.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/admin/batched_background_migrations/{id}',
    query: ['database'],
  },
});
