import { defineTool } from '@usemcpkit/core';

export const projectsTemplatesListTemplatesGitignores = defineTool({
  name: 'projects:templates:list_templates_gitignores',
  description: 'List all .gitignore templates. Lists all .gitignore templates.',
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
    path: '/templates/gitignores',
    query: ['page', 'per_page'],
  },
});
