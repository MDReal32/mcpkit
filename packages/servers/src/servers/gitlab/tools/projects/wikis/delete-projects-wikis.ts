import { defineTool } from '@usemcpkit/core';

export const projectsWikisDeleteProjectsWikis = defineTool({
  name: 'projects:wikis:delete_projects_wikis',
  description: 'Delete a wiki page for a project. Deletes a specified wiki page from a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group or project.',
      },
      slug: {
        type: 'string',
        description: 'URL-encoded slug of the wiki page, a unique string such as `dir%2Fpage_name`.',
      },
    },
    required: ['id', 'slug'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/wikis/{slug}',
  },
});
