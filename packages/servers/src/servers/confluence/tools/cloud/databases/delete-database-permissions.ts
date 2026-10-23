import { defineTool } from '@usemcpkit/core';

export const cloudDatabasesDeleteDatabasePermissions = defineTool({
  name: 'cloud:databases:delete_database_permissions',
  description:
    '[Cloud] Delete database permissions. Deletes direct content permissions from a database. See `DELETE /pages/{id}/permissions` for filter semantics.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the database.',
      },
      operation: {
        type: 'string',
        enum: ['read', 'update'],
        description: 'Filter by operation. Must be provided together with `principal-type` and `principal-id`.',
      },
      principal_type: {
        type: 'string',
        enum: ['user', 'group'],
        description: 'Filter by principal type. Must be provided together with `principal-id`.',
      },
      principal_id: {
        type: 'string',
        description: 'Filter by principal ID. Must be provided together with `principal-type`.',
      },
      allow_self_lockout: {
        type: 'boolean',
        description:
          "If `false` (default), the request is rejected when it would remove the calling user's own edit access. Set to `true` to allow the operation even when it locks out the caller.",
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/databases/{id}/permissions',
    query: {
      operation: 'operation',
      'principal-type': 'principal_type',
      'principal-id': 'principal_id',
      'allow-self-lockout': 'allow_self_lockout',
    },
  },
});
