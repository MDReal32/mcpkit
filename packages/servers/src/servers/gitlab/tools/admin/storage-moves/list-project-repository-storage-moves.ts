import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesListProjectRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:list_project_repository_storage_moves',
  description: 'List all project repository storage moves. Lists all project repository storage moves.',
  input: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/project_repository_storage_moves',
    query: ['page', 'per_page'],
  },
});
