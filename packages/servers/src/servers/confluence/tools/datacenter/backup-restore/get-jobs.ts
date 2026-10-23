import { defineTool } from '@usemcpkit/core';

export const datacenterBackupRestoreGetJobs = defineTool({
  name: 'datacenter:backup_restore:get_jobs',
  description:
    '[Data Center] Find jobs by filters. Returns jobs based on the filters provided. The user must have permission to see the jobs.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'userName of user who had created a job.',
      },
      spaceKey: {
        type: 'string',
        description: 'the key of the Space the User is attempting to view.',
      },
      fromDate: {
        type: 'string',
        description: 'minimum job creation date. Supported date format is `yyyy-MM-ddTHH:mm:ss.SSSZ`',
      },
      jobStates: {
        type: 'string',
        description:
          'list of job states. Acceptable values: "QUEUED", "PROCESSING", "FINISHED", "CANCELLING", "CANCELLED", "FAILED" (comma-separated)',
      },
      toDate: {
        type: 'string',
        description: 'maximum job create date. Supported date format is `yyyy-MM-ddTHH:mm:ss.SSSZ`',
      },
      jobOperation: {
        type: 'string',
        description: 'job operation. Acceptable values: "BACKUP" and "RESTORE"',
      },
      limit: {
        type: 'integer',
        description: 'amount of jobs that should be returned',
      },
      jobScope: {
        type: 'string',
        description: 'scope of the job. Acceptable values: "SPACE" and "SITE"',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/backup-restore/jobs',
    query: ['owner', 'spaceKey', 'fromDate', 'jobStates', 'toDate', 'jobOperation', 'limit', 'jobScope'],
  },
});
