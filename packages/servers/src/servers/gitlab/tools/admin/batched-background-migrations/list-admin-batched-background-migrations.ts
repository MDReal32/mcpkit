import { defineTool } from '@usemcpkit/core';

export const adminBatchedBackgroundMigrationsListAdminBatchedBackgroundMigrations = defineTool({
  name: 'admin:batched_background_migrations:list_admin_batched_background_migrations',
  description:
    'Get the list of batched background migrations. Lists all batched background migrations with optional filters for database and job class name.',
  input: {
    type: 'object',
    properties: {
      database: {
        type: 'string',
        default: 'main',
        enum: ['main', 'ci', 'sec', 'embedding', 'geo'],
        description: 'Name of the database.',
      },
      job_class_name: {
        type: 'string',
        description: 'Filter migrations by job class name.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/admin/batched_background_migrations',
    query: ['database', 'job_class_name'],
  },
});
