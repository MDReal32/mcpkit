import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesGetProjectRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:get_project_repository_storage_moves',
  description: 'Retrieve a project repository storage move. Retrieves a specified project repository storage move.',
  input: {
    type: 'object',
    properties: {
      repository_storage_move_id: {
        type: 'integer',
        description: 'ID of the project repository storage move.',
      },
    },
    required: ['repository_storage_move_id'],
  },
  request: {
    method: 'GET',
    path: '/project_repository_storage_moves/{repository_storage_move_id}',
  },
});
