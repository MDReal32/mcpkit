import { defineTool } from '@usemcpkit/core';

export const projectsProjectsListProjectsShareLocations = defineTool({
  name: 'projects:projects:list_projects_share_locations',
  description: 'List all groups available to invite to a project. Lists all groups that can be invited to a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the project.',
      },
      search: {
        type: 'string',
        description: 'Return groups matching the search criteria.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/share_locations',
    query: ['search'],
  },
});
