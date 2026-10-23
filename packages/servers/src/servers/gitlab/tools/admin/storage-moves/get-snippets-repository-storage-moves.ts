import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesGetSnippetsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:get_snippets_repository_storage_moves',
  description:
    'Retrieve a repository storage move for a snippet. Retrieves a repository storage move for a specified snippet.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the snippet.',
      },
      repository_storage_move_id: {
        type: 'integer',
        description: 'ID of the snippet repository storage move.',
      },
    },
    required: ['id', 'repository_storage_move_id'],
  },
  request: {
    method: 'GET',
    path: '/snippets/{id}/repository_storage_moves/{repository_storage_move_id}',
  },
});
