import { defineTool } from '@usemcpkit/core';

export const appsPackagesGetPackageForAuthenticatedUser = defineTool({
  name: 'apps:packages:get_package_for_authenticated_user',
  description:
    'Get a package for the authenticated user. Gets a specific package for a package owned by the authenticated user.',
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
    },
    required: ['package_type', 'package_name'],
  },
  request: {
    method: 'GET',
    path: '/user/packages/{package_type}/{package_name}',
  },
});
