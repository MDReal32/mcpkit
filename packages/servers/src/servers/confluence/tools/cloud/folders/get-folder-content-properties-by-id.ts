import { defineTool } from '@usemcpkit/core';

export const cloudFoldersGetFolderContentPropertiesById = defineTool({
  name: 'cloud:folders:get_folder_content_properties_by_id',
  description:
    '[Cloud] Get content property for folder by id. Retrieves a specific Content Property by ID that is attached to a specified folder.',
  input: {
    type: 'object',
    properties: {
      folder_id: {
        type: 'integer',
        description: 'The ID of the folder for which content properties should be returned.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the content property being requested.',
      },
    },
    required: ['folder_id', 'property_id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/folders/{folder_id}/properties/{property_id}',
  },
});
