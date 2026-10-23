import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesCreateProjectsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:create_projects_repository_storage_moves',
  description:
    'Create a repository storage move for a project. Creates a repository storage move for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    path: '/projects/{id}/repository_storage_moves',
    body: ['destination_storage_name'],
  },
});
