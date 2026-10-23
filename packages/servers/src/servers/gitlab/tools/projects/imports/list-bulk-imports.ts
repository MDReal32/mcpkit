import { defineTool } from '@usemcpkit/core';

export const projectsImportsListBulkImports = defineTool({
  name: 'projects:imports:list_bulk_imports',
  description: 'List all group or project migrations. Lists all group or project migrations.',
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
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order by creation date.',
      },
      status: {
        type: 'string',
        enum: ['created', 'started', 'finished', 'timeout', 'failed', 'canceled'],
        description: 'Filter migrations by import status.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/bulk_imports',
    query: ['page', 'per_page', 'sort', 'status'],
  },
});
