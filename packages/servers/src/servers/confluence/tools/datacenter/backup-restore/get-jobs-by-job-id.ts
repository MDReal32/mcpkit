import { defineTool } from "@usemcpkit/core";

export const datacenterBackupRestoreGetJobsByJobId = defineTool({
  name: "datacenter:backup_restore:get_jobs_by_job_id",
  description: "[Data Center] Get job by ID. Get job by id. The user must be a sysadmin or the owner of the job.",
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
    method: "GET",
    path: "/rest/api/backup-restore/jobs/{jobId}",
  },
});
