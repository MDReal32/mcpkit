import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetProjectsStatistics = defineTool({
  name: 'projects:projects:get_projects_statistics',
  description:
    'Retrieve the statistics of the last 30 days. Retrieves the clone and pull statistics for the last 30 days from a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/statistics',
  },
});
