import { defineTool } from '@usemcpkit/core';

export const migrationsUnlockRepoForAuthenticatedUser = defineTool({
  name: 'migrations:unlock_repo_for_authenticated_user',
  description:
    'Unlock a user repository. Unlocks a repository. You can lock repositories when you start a user migration. Once the migration is complete you can unlock each repository to begin using it again or delete the repository if you no longer need the source data. Returns a status of `404 Not Found` if the repository is not locked.',
  input: {
    type: 'object',
    properties: {
      migration_id: {
        type: 'integer',
        description: 'The unique identifier of the migration.',
      },
      repo_name: {
        type: 'string',
        description: 'repo_name parameter',
      },
    },
    required: ['migration_id', 'repo_name'],
  },
  request: {
    method: 'DELETE',
    path: '/user/migrations/{migration_id}/repos/{repo_name}/lock',
  },
});
