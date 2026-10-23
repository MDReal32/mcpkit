import { defineTool } from '@usemcpkit/core';

export const packagesDependencyProxyGetProjectsDependencyProxyPackagesNpm = defineTool({
  name: 'packages:dependency_proxy:get_projects_dependency_proxy_packages_npm',
  description: 'Proxy the download of a NPM package tarball. This feature was introduced in 16.11',
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
    },
    required: ['id', 'package_name', 'file_name'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/dependency_proxy/packages/npm/{package_name}/-/{file_name}',
  },
});
