import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsDeleteArchiveForOrg = defineTool({
  name: 'orgs:migrations:delete_archive_for_org',
  description:
    'Delete an organization migration archive. Deletes a previous migration archive. Migration archives are automatically deleted after seven days.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      migration_id: {
        type: 'integer',
        description: 'The unique identifier of the migration.',
      },
    },
    required: ['org', 'migration_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/migrations/{migration_id}/archive',
  },
});
