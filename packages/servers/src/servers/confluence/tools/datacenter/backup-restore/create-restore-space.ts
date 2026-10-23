import { defineTool } from '@usemcpkit/core';

export const datacenterBackupRestoreCreateRestoreSpace = defineTool({
  name: 'datacenter:backup_restore:create_restore_space',
  description: '[Data Center] Create space restore job. Creates new space restore job and adds it to the queue.',
  input: {
    type: 'object',
    properties: {
      filename: {
        type: 'string',
      },
      skipReindex: {
        type: 'boolean',
      },
      fileName: {
        type: 'string',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/backup-restore/restore/space',
    body: ['filename', 'skipReindex', 'fileName'],
  },
});
