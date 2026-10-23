import { defineTool } from '@usemcpkit/core';

export const cloudDatabasesUpdateDatabasePropertyById = defineTool({
  name: 'cloud:databases:update_database_property_by_id',
  description:
    '[Cloud] Update content property for database by id. Update a content property for a database by its id.',
  input: {
    type: 'object',
    properties: {
      database_id: {
        type: 'integer',
        description: 'The ID of the database the property belongs to.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the property to be updated.',
      },
      key: {
        type: 'string',
        description: 'Key of the content property',
      },
      value: {
        description: 'Value of the content property.',
      },
      version: {
        type: 'object',
        description: 'New version number and associated message',
        properties: {
          number: {
            type: 'integer',
            description: 'Version number of the new version. Should be 1 more than the current version number.',
          },
          message: {
            type: 'string',
            description: 'Message to be associated with the new version.',
          },
        },
      },
    },
    required: ['database_id', 'property_id'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/databases/{database_id}/properties/{property_id}',
    body: ['key', 'value', 'version'],
  },
});
