import { defineTool } from '@usemcpkit/core';

export const adminOfflineTransfersGetOfflineExports = defineTool({
  name: 'admin:offline_transfers:get_offline_exports',
  description:
    'Get offline transfer export details. Retrieves details of an offline transfer export. For more information, see https://docs.gitlab.com/user/group/import/offline_transfer_migrations/',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the offline transfer export.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/offline_exports/{id}',
  },
});
