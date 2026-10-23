import { defineTool } from "@usemcpkit/core";

export const datacenterBackupRestoreCreateBackupSite = defineTool({
  name: "datacenter:backup_restore:create_backup_site",
  description: "[Data Center] Create site backup job. Starts the new site backup job.",
  input: {
    type: "object",
    properties: {
      skipAttachments: {
        type: "boolean",
      },
      keepPermanently: {
        type: "boolean",
      },
      fileNamePrefix: {
        type: "string",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/backup-restore/backup/site",
    body: ["skipAttachments", "keepPermanently", "fileNamePrefix"],
  },
});
