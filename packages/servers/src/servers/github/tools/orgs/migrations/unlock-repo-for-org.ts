import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsUnlockRepoForOrg = defineTool({
  name: 'orgs:migrations:unlock_repo_for_org',
  description:
    'Unlock an organization repository. Unlocks a repository that was locked for migration. You should unlock each migrated repository and delete them when the migration is complete and you no longer need the source data.',
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
      repo_name: {
        type: 'string',
        description: 'repo_name parameter',
      },
    },
    required: ['org', 'migration_id', 'repo_name'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock',
  },
});
