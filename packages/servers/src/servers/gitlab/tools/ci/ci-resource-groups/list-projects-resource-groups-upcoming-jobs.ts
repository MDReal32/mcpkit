import { defineTool } from '@usemcpkit/core';

export const ciCiResourceGroupsListProjectsResourceGroupsUpcomingJobs = defineTool({
  name: 'ci:ci_resource_groups:list_projects_resource_groups_upcoming_jobs',
  description: 'List all upcoming jobs for a resource group. Lists all upcoming jobs for a specified resource group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      key: {
        type: 'string',
        description: 'URL-encoded key of the resource group, for example `resource%5Fa` instead of `resource_a`.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'key'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/resource_groups/{key}/upcoming_jobs',
    query: ['page', 'per_page'],
  },
});
