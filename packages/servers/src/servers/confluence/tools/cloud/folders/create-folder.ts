import { defineTool } from '@usemcpkit/core';

export const cloudFoldersCreateFolder = defineTool({
  name: 'cloud:folders:create_folder',
  description: '[Cloud] Create folder. Creates a folder in the space.',
  input: {
    type: 'object',
    properties: {
      spaceId: {
        type: 'string',
        description: 'ID of the space.',
      },
      title: {
        type: 'string',
        description: 'Title of the folder.',
      },
      parentId: {
        type: 'string',
        description: 'The parent content ID of the folder.',
      },
    },
    required: ['spaceId'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/folders',
    body: ['spaceId', 'title', 'parentId'],
  },
});
