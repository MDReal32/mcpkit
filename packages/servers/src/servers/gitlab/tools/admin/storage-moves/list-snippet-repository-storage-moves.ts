import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesListSnippetRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:list_snippet_repository_storage_moves',
  description:
    'List all snippet repository storage moves. Lists all snippet repository storage moves. By default, `GET` requests return 20 results at a time because the API results are paginated.',
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
    path: '/snippet_repository_storage_moves',
    query: ['page', 'per_page'],
  },
});
