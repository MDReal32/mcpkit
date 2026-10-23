import { defineTool } from '@usemcpkit/core';

export const projectsProjectsListProjectsStarrers = defineTool({
  name: 'projects:projects:list_projects_starrers',
  description: 'List all users who starred a project. Lists all users who starred a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      search: {
        type: 'string',
        description: 'Search for a specific user by their username or name.',
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
    path: '/projects/{id}/starrers',
    query: ['search', 'page', 'per_page'],
  },
});
