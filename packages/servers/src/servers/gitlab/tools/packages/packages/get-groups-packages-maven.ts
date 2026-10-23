import { defineTool } from '@usemcpkit/core';

export const packagesPackagesGetGroupsPackagesMaven = defineTool({
  name: 'packages:packages:get_groups_packages_maven',
  description: 'Download the maven package file for a group. This feature was introduced in GitLab 11.7',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID or URL-encoded path of the group',
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
    path: '/groups/{id}/-/packages/maven/{path}/{file_name}',
  },
});
