import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesGetGroupsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:get_groups_repository_storage_moves',
  description:
    'Retrieve a repository storage move for a group. Retrieves a specified repository storage move for a group. This feature was introduced in GitLab 13.9.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      repository_storage_move_id: {
        type: 'integer',
        description: 'ID of the group repository storage move.',
      },
    },
    required: ['id', 'repository_storage_move_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/repository_storage_moves/{repository_storage_move_id}',
  },
});
