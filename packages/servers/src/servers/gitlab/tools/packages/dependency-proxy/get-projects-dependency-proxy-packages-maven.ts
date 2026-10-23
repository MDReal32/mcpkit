import { defineTool } from '@usemcpkit/core';

export const packagesDependencyProxyGetProjectsDependencyProxyPackagesMaven = defineTool({
  name: 'packages:dependency_proxy:get_projects_dependency_proxy_packages_maven',
  description:
    'Proxy the download of a maven package file at a project level. This feature was introduced in GitLab 16.2',
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
    path: '/projects/{id}/dependency_proxy/packages/maven/{path}/{file_name}',
  },
});
