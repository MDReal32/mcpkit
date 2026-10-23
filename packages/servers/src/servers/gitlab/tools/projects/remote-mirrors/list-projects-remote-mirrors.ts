import { defineTool } from '@usemcpkit/core';

export const projectsRemoteMirrorsListProjectsRemoteMirrors = defineTool({
  name: 'projects:remote_mirrors:list_projects_remote_mirrors',
  description: 'List all remote mirrors for a project. Lists all remote mirrors for a specified project.',
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
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/remote_mirrors',
    query: ['page', 'per_page'],
  },
});
