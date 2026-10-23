import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesListGroupRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:list_group_repository_storage_moves',
  description: 'List all group repository storage moves. Lists all group repository storage moves for an instance.',
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
    path: '/group_repository_storage_moves',
    query: ['page', 'per_page'],
  },
});
