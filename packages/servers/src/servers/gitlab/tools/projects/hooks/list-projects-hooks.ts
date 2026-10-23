import { defineTool } from '@usemcpkit/core';

export const projectsHooksListProjectsHooks = defineTool({
  name: 'projects:hooks:list_projects_hooks',
  description: 'List all webhooks for a project. Lists all webhooks for a specified project.',
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
    path: '/projects/{id}/hooks',
    query: ['page', 'per_page'],
  },
});
