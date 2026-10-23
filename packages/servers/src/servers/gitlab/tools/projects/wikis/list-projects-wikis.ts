import { defineTool } from '@usemcpkit/core';

export const projectsWikisListProjectsWikis = defineTool({
  name: 'projects:wikis:list_projects_wikis',
  description: 'List all wiki pages for a project. Lists all wiki pages for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group or project.',
      },
      with_content: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes the content of each wiki page.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/wikis',
    query: ['with_content'],
  },
});
