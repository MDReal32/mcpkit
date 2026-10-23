import { defineTool } from '@usemcpkit/core';

export const appsPackagesGetPackageVersionForOrganization = defineTool({
  name: 'apps:packages:get_package_version_for_organization',
  description: 'Get a package version for an organization. Gets a specific package version in an organization.',
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
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      package_version_id: {
        type: 'integer',
        description: 'Unique identifier of the package version.',
      },
    },
    required: ['package_type', 'package_name', 'org', 'package_version_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}',
  },
});
