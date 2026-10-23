import { defineTool } from '@usemcpkit/core';

export const cloudFoldersDeleteFolder = defineTool({
  name: 'cloud:folders:delete_folder',
  description: '[Cloud] Delete folder. Delete a folder by id.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the folder to be deleted.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/folders/{id}',
  },
});
