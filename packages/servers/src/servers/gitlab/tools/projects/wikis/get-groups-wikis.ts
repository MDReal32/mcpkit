import { defineTool } from '@usemcpkit/core';

export const projectsWikisGetGroupsWikis = defineTool({
  name: 'projects:wikis:get_groups_wikis',
  description: 'Retrieve a wiki page for a group. Retrieves a specified wiki page for a group.',
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
      version: {
        type: 'string',
        description: 'Version SHA of the wiki page.',
      },
      render_html: {
        type: 'boolean',
        default: false,
        description: 'If `true`, returns the rendered HTML of the wiki page.',
      },
    },
    required: ['id', 'slug'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/wikis/{slug}',
    query: ['version', 'render_html'],
  },
});
