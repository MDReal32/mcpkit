import { defineTool } from '@usemcpkit/core';

export const projectsReleasesListGroupsReleases = defineTool({
  name: 'projects:releases:list_groups_releases',
  description: 'List all releases in a group. Lists all releases for projects in a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
      simple: {
        type: 'boolean',
        default: false,
        description: 'If `true`, only returns limited fields for each release.',
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
    path: '/groups/{id}/releases',
    query: ['sort', 'simple', 'page', 'per_page'],
  },
});
