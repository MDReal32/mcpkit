import { defineTool } from '@usemcpkit/core';

export const appsPackagesListPackagesForOrganization = defineTool({
  name: 'apps:packages:list_packages_for_organization',
  description: 'List packages for an organization. Lists packages in an organization readable by the user.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      package_type: {
        type: 'string',
        enum: ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container'],
        description:
          "The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry.",
      },
      visibility: {
        type: 'string',
        enum: ['public', 'private', 'internal'],
        description:
          'The selected visibility of the packages. This parameter is optional and only filters an existing result set.',
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
    },
    required: ['org', 'package_type'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/packages',
    query: ['package_type', 'visibility', 'page', 'per_page'],
  },
});
