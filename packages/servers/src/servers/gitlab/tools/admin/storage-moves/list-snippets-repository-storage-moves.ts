import { defineTool } from '@usemcpkit/core';

export const adminStorageMovesListSnippetsRepositoryStorageMoves = defineTool({
  name: 'admin:storage_moves:list_snippets_repository_storage_moves',
  description:
    'List all repository storage moves for a snippet. Lists all repository storage moves for a specified snippet. By default, `GET` requests return 20 results at a time because the API results are paginated.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the snippet.',
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
    path: '/snippets/{id}/repository_storage_moves',
    query: ['page', 'per_page'],
  },
});
