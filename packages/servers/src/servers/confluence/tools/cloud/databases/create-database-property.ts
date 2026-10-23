import { defineTool } from '@usemcpkit/core';

export const cloudDatabasesCreateDatabaseProperty = defineTool({
  name: 'cloud:databases:create_database_property',
  description: '[Cloud] Create content property for database. Creates a new content property for a database.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the database to create a property for.',
      },
      key: {
        type: 'string',
        description: 'Key of the content property',
      },
      value: {
        description: 'Value of the content property.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/databases/{id}/properties',
    body: ['key', 'value'],
  },
});
