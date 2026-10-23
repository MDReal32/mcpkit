import { defineTool } from '@usemcpkit/core';

export const ciRunnersGetRunnersProjects = defineTool({
  name: 'ci:runners:get_runners_projects',
  description:
    'Get projects associated with a runner. Get a paginated list of all projects associated with the specified runner. Access is restricted based on user permissions.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the runner.',
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
    path: '/runners/{id}/projects',
    query: ['page', 'per_page'],
  },
});
