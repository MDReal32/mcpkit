import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesCreateGroupsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:create_groups_repository_storage_moves',
  description:
    'Create a group repository storage move. Creates a group repository storage move for a specified group. This operation moves only group wiki repositories and does not move repositories for projects in a group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      destination_storage_name: {
        type: 'string',
        description:
          'Name of the destination storage shard. If omitted, the storage is selected automatically based on storage weights.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/repository_storage_moves',
    body: ['destination_storage_name'],
  },
});
