import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesCreateProjectRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:create_project_repository_storage_moves',
  description:
    'Create repository storage moves for all projects on a storage shard. Creates repository storage moves for each project repository stored on the source storage shard. This endpoint migrates all projects at once.',
  input: {
    type: 'object',
    properties: {
      source_storage_name: {
        type: 'string',
        description: 'Name of the source storage shard.',
      },
      destination_storage_name: {
        type: 'string',
        description:
          'Name of the destination storage shard. If not provided, the storage is selected automatically based on storage weights.',
      },
    },
    required: ['source_storage_name'],
  },
  request: {
    method: 'POST',
    path: '/project_repository_storage_moves',
    body: ['source_storage_name', 'destination_storage_name'],
  },
});
