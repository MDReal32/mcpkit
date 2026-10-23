import { defineTool } from '@usemcpkit/core';

export const packagesPackagesUpdateProjectsPackagesGenericAuthorizePut = defineTool({
  name: 'packages:packages:update_projects_packages_generic_authorize_put',
  description: 'Workhorse authorize generic package file. This feature was introduced in GitLab 13.5',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID or URL-encoded path of the project',
      },
      package_name: {
        type: 'string',
        description: 'Package name',
      },
      file_name: {
        type: 'string',
        description: 'Package file name',
      },
      package_version: {
        type: 'string',
        description: 'Package version',
      },
      path: {},
      status: {
        type: 'string',
        description: 'Package status',
        enum: ['default', 'hidden'],
      },
    },
    required: ['id', 'package_name', 'file_name', 'package_version', 'path'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/packages/generic/{package_name}/{package_version}/{path}/{file_name}/authorize',
    body: ['status'],
  },
});
