import { defineTool } from '@usemcpkit/core';

export const cloudDatabasesGetDatabaseOperations = defineTool({
  name: 'cloud:databases:get_database_operations',
  description:
    '[Cloud] Get permitted operations for a database. Returns the permitted operations on specific database.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the database for which operations should be returned.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/databases/{id}/operations',
  },
});
