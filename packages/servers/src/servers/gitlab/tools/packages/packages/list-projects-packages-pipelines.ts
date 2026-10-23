import { defineTool } from '@usemcpkit/core';

export const packagesPackagesListProjectsPackagesPipelines = defineTool({
  name: 'packages:packages:list_projects_packages_pipelines',
  description:
    'List all package pipelines. Lists all pipelines for a specified package. The results are sorted by `id` in descending order. The results are paginated and return up to 20 records per page. This feature was introduced in GitLab 16.1.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      package_id: {
        type: 'integer',
        description: 'ID of the package.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items per page',
      },
      cursor: {
        type: 'string',
        description: 'Cursor for obtaining the next set of records.',
      },
    },
    required: ['id', 'package_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/packages/{package_id}/pipelines',
    query: ['page', 'per_page', 'cursor'],
  },
});
