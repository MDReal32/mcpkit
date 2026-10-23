import { defineTool } from '@usemcpkit/core';

export const adminOfflineTransfersListOfflineExports = defineTool({
  name: 'admin:offline_transfers:list_offline_exports',
  description:
    'List all offline transfer exports. Lists all offline transfer exports. For more information, see https://docs.gitlab.com/user/group/import/offline_transfer_migrations/',
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
        enum: ['created', 'started', 'finished', 'failed'],
        description: 'Return offline transfer exports with the specified status.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/offline_exports',
    query: ['page', 'per_page', 'sort', 'status'],
  },
});
