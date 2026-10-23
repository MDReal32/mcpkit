import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesListProjectsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:list_projects_repository_storage_moves',
  description: 'List all repository storage moves for a project. Lists all repository storage moves for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    path: '/projects/{id}/repository_storage_moves',
    query: ['page', 'per_page'],
  },
});
