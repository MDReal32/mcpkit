import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsGetArchiveForAuthenticatedUser = defineTool({
  name: 'orgs:migrations:get_archive_for_authenticated_user',
  description:
    'Download a user migration archive. Fetches the URL to download the migration archive as a `tar.gz` file. Depending on the resources your repository uses, the migration archive can contain JSON files with data for these objects:',
  input: {
    type: 'object',
    properties: {
      migration_id: {
        type: 'integer',
        description: 'The unique identifier of the migration.',
      },
    },
    required: ['migration_id'],
  },
  request: {
    method: 'GET',
    path: '/user/migrations/{migration_id}/archive',
  },
});
