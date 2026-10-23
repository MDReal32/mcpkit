import { defineTool } from '@usemcpkit/core';

export const packagesPackagesGetPackagesMaven = defineTool({
  name: 'packages:packages:get_packages_maven',
  description: 'Download the maven package file for the instance. This feature was introduced in GitLab 11.6',
  input: {
    type: 'object',
    properties: {
      file_name: {
        type: 'string',
        description: 'Package file name',
      },
      path: {
        type: 'string',
        description: 'Package path',
      },
    },
    required: ['file_name', 'path'],
  },
  request: {
    method: 'GET',
    path: '/packages/maven/{path}/{file_name}',
  },
});
