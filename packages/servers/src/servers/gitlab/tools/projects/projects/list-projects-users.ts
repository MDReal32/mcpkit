import { defineTool } from '@usemcpkit/core';

export const projectsProjectsListProjectsUsers = defineTool({
  name: 'projects:projects:list_projects_users',
  description: 'List all members of a project. Lists all members with access to a specified project.',
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
      skip_users: {
        type: 'string',
        description: 'Filter out members with the specified IDs. (comma-separated)',
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
    path: '/projects/{id}/users',
    query: ['search', 'skip_users', 'page', 'per_page'],
  },
});
