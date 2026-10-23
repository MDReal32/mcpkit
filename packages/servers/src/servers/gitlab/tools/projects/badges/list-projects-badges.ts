import { defineTool } from '@usemcpkit/core';

export const projectsBadgesListProjectsBadges = defineTool({
  name: 'projects:badges:list_projects_badges',
  description: 'List all badges for a project. Lists all badges for a specified project, including group badges.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
      name: {
        type: 'string',
        description: 'Name of the badge.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/badges',
    query: ['page', 'per_page', 'name'],
  },
});
