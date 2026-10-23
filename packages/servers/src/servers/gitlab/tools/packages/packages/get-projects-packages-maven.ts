import { defineTool } from '@usemcpkit/core';

export const packagesPackagesGetProjectsPackagesMaven = defineTool({
  name: 'packages:packages:get_projects_packages_maven',
  description: 'Download the maven package file for a project. This feature was introduced in GitLab 11.3',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID or URL-encoded path of the project',
      },
      file_name: {
        type: 'string',
        description: 'Package file name',
      },
      path: {
        type: 'string',
        description: 'Package path',
      },
    },
    required: ['id', 'file_name', 'path'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/packages/maven/{path}/{file_name}',
  },
});
