import { defineTool } from '@usemcpkit/core';

export const packagesContainerRegistryListGroupsRegistryRepositories = defineTool({
  name: 'packages:container_registry:list_groups_registry_repositories',
  description: 'List all registry repositories for a group. Lists all registry repositories for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
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
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/registry/repositories',
    query: ['page', 'per_page'],
  },
});
