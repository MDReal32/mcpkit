import { defineTool } from '@usemcpkit/core';

export const datacenterBackupRestoreCreateRestoreSite = defineTool({
  name: 'datacenter:backup_restore:create_restore_site',
  description: '[Data Center] Create site restore job. Starts the new site restore job.',
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
    path: '/rest/api/backup-restore/restore/site',
    body: ['filename', 'skipReindex', 'fileName'],
  },
});
