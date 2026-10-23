import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesCreateSnippetsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:create_snippets_repository_storage_moves',
  description:
    'Schedule a repository storage move for a snippet. Schedules a repository storage move for a specified snippet.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the snippet.',
      },
      destination_storage_name: {
        type: 'string',
        description:
          'Name of the destination storage shard. If not provided, the storage is selected automatically based on storage weights.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/snippets/{id}/repository_storage_moves',
    body: ['destination_storage_name'],
  },
});
