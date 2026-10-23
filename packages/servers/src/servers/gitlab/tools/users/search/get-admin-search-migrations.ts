import { defineTool } from '@usemcpkit/core';

export const usersSearchGetAdminSearchMigrations = defineTool({
  name: 'users:search:get_admin_search_migrations',
  description:
    'Retrieve an advanced search migration. Retrieves a specified advanced search migration by migration version or name.',
  input: {
    type: 'object',
    properties: {
      migration_id: {
        type: 'string',
        description: 'Version or name of the search migration.',
      },
    },
    required: ['migration_id'],
  },
  request: {
    method: 'GET',
    path: '/admin/search/migrations/{migration_id}',
  },
});
