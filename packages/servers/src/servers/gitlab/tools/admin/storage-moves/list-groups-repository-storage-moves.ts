import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesListGroupsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:list_groups_repository_storage_moves',
  description:
    'List all repository storage moves for a group. Lists all repository storage moves for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
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
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/repository_storage_moves',
    query: ['page', 'per_page'],
  },
});
