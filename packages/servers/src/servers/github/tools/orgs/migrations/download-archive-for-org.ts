import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsDownloadArchiveForOrg = defineTool({
  name: 'orgs:migrations:download_archive_for_org',
  description: 'Download an organization migration archive. Fetches the URL to a migration archive.',
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
    method: 'GET',
    path: '/orgs/{org}/migrations/{migration_id}/archive',
  },
});
