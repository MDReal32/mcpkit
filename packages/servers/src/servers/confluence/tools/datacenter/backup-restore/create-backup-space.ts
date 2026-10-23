import { defineTool } from '@usemcpkit/core';

export const datacenterBackupRestoreCreateBackupSpace = defineTool({
  name: 'datacenter:backup_restore:create_backup_space',
  description: '[Data Center] Create space backup job. Creates new space backup job and adds it to the queue.',
  input: {
    type: 'object',
    properties: {
      spaceKeys: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      keepPermanently: {
        type: 'boolean',
      },
      fileNamePrefix: {
        type: 'string',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/backup-restore/backup/space',
    body: ['spaceKeys', 'keepPermanently', 'fileNamePrefix'],
  },
});
