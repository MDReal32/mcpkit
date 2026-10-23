import { defineTool } from '@usemcpkit/core';

export const cloudDatabasesGetDatabaseFields = defineTool({
  name: 'cloud:databases:get_database_fields',
  description:
    '[Cloud] Get fields for database. Returns the field definitions (schema) for a database, ordered by the user-defined column order, using cursor-based pagination.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The Confluence content ID of the database, represented as an ASCII decimal-digit string.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of results to return. The value must be a positive integer without a sign, decimal point, or leading zero. The default is 50 and the maximum is 250.',
      },
      cursor: {
        type: 'string',
        description:
          'Opaque, offset-based continuation token obtained from `_links.next` or the `Link` response header. A cursor is scoped to the database, collection endpoint, filters, sort, and page size that produced it. Reusing a well-formed cursor with any different query context returns `CURSOR_QUERY_MISMATCH`; malformed or structurally invalid cursors return `INVALID_CURSOR`, and a decoded but unsupported vers…',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/databases/{id}/fields',
    query: ['limit', 'cursor'],
  },
});
