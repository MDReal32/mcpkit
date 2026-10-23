import { defineTool } from '@usemcpkit/core';

export const projectsProjectAliasListProjectAliases = defineTool({
  name: 'projects:project_alias:list_project_aliases',
  description: 'List all project aliases. Lists all project aliases for the instance.',
  input: {
    type: 'object',
    properties: {
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
  },
  request: {
    method: 'GET',
    path: '/project_aliases',
    query: ['page', 'per_page'],
  },
});
