import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesGetGroupRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:get_group_repository_storage_moves',
  description:
    'Retrieve a group repository storage move. Retrieves a specified group repository storage move. This feature was introduced in GitLab 13.9.',
  input: {
    type: 'object',
    properties: {
      repository_storage_move_id: {
        type: 'integer',
        description: 'ID of the group repository storage move.',
      },
    },
    required: ['repository_storage_move_id'],
  },
  request: {
    method: 'GET',
    path: '/group_repository_storage_moves/{repository_storage_move_id}',
  },
});
