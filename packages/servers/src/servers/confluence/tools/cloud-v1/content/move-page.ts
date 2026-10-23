import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentMovePage = defineTool({
  name: 'cloud_v1:content:move_page',
  description:
    '[Cloud v1] Move a page to a new location relative to a target page. Move a page to a new location relative to a target page:',
  input: {
    type: 'object',
    properties: {
      pageId: {
        type: 'string',
        description: 'The ID of the page to be moved',
      },
      position: {
        type: 'string',
        enum: ['before', 'after', 'append'],
        description:
          'The position to move the page to relative to the target page: * `before` - move the page under the same parent as the target, before the target in the list of children * `after` - move the page under the same parent as the target, after the target in the list of children * `append` - move the page to be a child of the target',
      },
      targetId: {
        type: 'string',
        description: 'The ID of the target page for this operation',
      },
    },
    required: ['pageId', 'position', 'targetId'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/rest/api/content/{pageId}/move/{position}/{targetId}',
  },
});
