import { defineTool } from '@usemcpkit/core';

export const projectsWikisDeleteGroupsWikis = defineTool({
  name: 'projects:wikis:delete_groups_wikis',
  description: 'Delete a wiki page for a group. Deletes a specified wiki page from a group.',
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
    path: '/groups/{id}/wikis/{slug}',
  },
});
