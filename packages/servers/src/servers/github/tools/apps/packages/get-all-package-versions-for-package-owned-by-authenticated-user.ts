import { defineTool } from '@usemcpkit/core';

export const appsPackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser = defineTool({
  name: 'apps:packages:get_all_package_versions_for_package_owned_by_authenticated_user',
  description:
    'List package versions for a package owned by the authenticated user. Lists package versions for a package owned by the authenticated user.',
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
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      state: {
        type: 'string',
        default: 'active',
        enum: ['active', 'deleted'],
        description: 'The state of the package, either active or deleted.',
      },
    },
    required: ['package_type', 'package_name'],
  },
  request: {
    method: 'GET',
    path: '/user/packages/{package_type}/{package_name}/versions',
    query: ['page', 'per_page', 'state'],
  },
});
