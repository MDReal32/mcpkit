import { defineTool } from '@usemcpkit/core';

export const appsPackagesRestorePackageForUser = defineTool({
  name: 'apps:packages:restore_package_for_user',
  description: 'Restore a package for a user. Restores an entire package for a user.',
  input: {
    type: 'object',
    properties: {
      package_type: {
        type: 'string',
        enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
        description:
          "The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry.",
      },
      package_name: {
        type: 'string',
        description: 'The name of the package.',
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      token: {
        type: 'string',
        description: 'package token',
      },
    },
    required: ['package_type', 'package_name', 'username'],
  },
  request: {
    method: 'POST',
    path: '/users/{username}/packages/{package_type}/{package_name}/restore',
    query: ['token'],
  },
});
