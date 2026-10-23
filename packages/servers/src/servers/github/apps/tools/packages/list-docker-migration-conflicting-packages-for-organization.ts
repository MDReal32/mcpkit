import { defineTool } from '@usemcpkit/core';

export const packagesListDockerMigrationConflictingPackagesForOrganization = defineTool({
  name: 'packages:list_docker_migration_conflicting_packages_for_organization',
  description:
    'Get list of conflicting packages during Docker migration for organization. Lists all packages that are in a specific organization, are readable by the requesting user, and that encountered a conflict during a Docker migration.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/docker/conflicts',
  },
});
