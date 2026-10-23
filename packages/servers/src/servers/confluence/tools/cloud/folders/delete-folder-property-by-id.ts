import { defineTool } from '@usemcpkit/core';

export const cloudFoldersDeleteFolderPropertyById = defineTool({
  name: 'cloud:folders:delete_folder_property_by_id',
  description: '[Cloud] Delete content property for folder by id. Deletes a content property for a folder by its id.',
  input: {
    type: 'object',
    properties: {
      folder_id: {
        type: 'integer',
        description: 'The ID of the folder the property belongs to.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the property to be deleted.',
      },
    },
    required: ['folder_id', 'property_id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/folders/{folder_id}/properties/{property_id}',
  },
});
