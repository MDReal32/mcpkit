import { defineTool } from '@usemcpkit/core';

export const projectsWikisListGroupsWikis = defineTool({
  name: 'projects:wikis:list_groups_wikis',
  description: 'List all wiki pages for a group. Lists all wiki pages for a specified group.',
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
    path: '/groups/{id}/wikis',
    query: ['with_content'],
  },
});
