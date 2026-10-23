import { defineTool } from '@usemcpkit/core';

export const appsPackagesListDockerMigrationConflictingPackagesForUser = defineTool({
  name: 'apps:packages:list_docker_migration_conflicting_packages_for_user',
  description:
    "Get list of conflicting packages during Docker migration for user. Lists all packages that are in a specific user's namespace, that the requesting user has access to, and that encountered a conflict during Docker migration.",
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/docker/conflicts',
  },
});
