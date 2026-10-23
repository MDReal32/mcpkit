import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesGetSnippetRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:get_snippet_repository_storage_moves',
  description: 'Retrieve a snippet repository storage move. Retrieves a specified snippet repository storage move.',
  input: {
    type: 'object',
    properties: {
      repository_storage_move_id: {
        type: 'integer',
        description: 'ID of the snippet repository storage move.',
      },
    },
    required: ['repository_storage_move_id'],
  },
  request: {
    method: 'GET',
    path: '/snippet_repository_storage_moves/{repository_storage_move_id}',
  },
});
