import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentDeletePageTree = defineTool({
  name: 'cloud_v1:content:delete_page_tree',
  description: "[Cloud v1] Delete page tree. Moves a pagetree rooted at a page to the space's trash:",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content which forms root of the page tree, to be deleted.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/content/{id}/pageTree',
  },
});
