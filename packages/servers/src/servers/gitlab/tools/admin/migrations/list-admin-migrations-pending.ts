import { defineTool } from '@usemcpkit/core';

export const adminMigrationsListAdminMigrationsPending = defineTool({
  name: 'admin:migrations:list_admin_migrations_pending',
  description: 'List all pending migrations. Lists all pending migrations for the instance.',
  input: {
    type: 'object',
    properties: {
      database: {
        type: 'string',
        default: 'main',
        enum: ['main', 'ci', 'sec', 'embedding', 'geo'],
        description: 'Database name to query.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/admin/migrations/pending',
    query: ['database'],
  },
});
