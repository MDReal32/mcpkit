import { defineTool } from "@usemcpkit/core";

export const datacenterBackupRestoreUpdateJobsCancel = defineTool({
  name: "datacenter:backup_restore:update_jobs_cancel",
  description:
    "[Data Center] Cancel job. Cancels the job. If the job is already cancelled or failed, the method will do nothing.",
  input: {
    type: "object",
    properties: {
      jobId: {
        type: "integer",
        description: "id of the backup/restore job",
      },
    },
    required: ["jobId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/backup-restore/jobs/{jobId}/cancel",
  },
});
