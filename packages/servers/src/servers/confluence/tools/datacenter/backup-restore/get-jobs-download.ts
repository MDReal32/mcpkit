import { defineTool } from "@usemcpkit/core";

export const datacenterBackupRestoreGetJobsDownload = defineTool({
  name: "datacenter:backup_restore:get_jobs_download",
  description:
    "[Data Center] Download backup file. Downloads the backup file for the given job. Requires site admin or space export permissions for all spaces included in the backup job.",
  input: {
    type: "object",
    properties: {
      jobId: {
        type: "integer",
        description: "id of the backup/restore job",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["jobId", "save_to"],
  },
  request: {
    method: "GET",
    path: "/rest/api/backup-restore/jobs/{jobId}/download",
    saveToArg: "save_to",
  },
});
