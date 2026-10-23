import { defineTool } from "@usemcpkit/core";

export const datacenterBackupRestoreGetRestoreFiles = defineTool({
  name: "datacenter:backup_restore:get_restore_files",
  description:
    "[Data Center] Get files in restore directory. returns list of information on files in conf-home/restore/(jobScope).",
  input: {
    type: "object",
    properties: {
      jobScope: {
        type: "string",
        description: "name of type of restore job (SITE or SPACE or null), if null, all backup files are listed",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/backup-restore/restore/files",
    query: ["jobScope"],
  },
});
