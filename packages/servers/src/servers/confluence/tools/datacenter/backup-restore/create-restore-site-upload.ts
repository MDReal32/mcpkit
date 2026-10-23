import { defineTool } from "@usemcpkit/core";

export const datacenterBackupRestoreCreateRestoreSiteUpload = defineTool({
  name: "datacenter:backup_restore:create_restore_site_upload",
  description:
    "[Data Center] Create site restore job for upload backup file. This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867.",
  input: {
    type: "object",
    properties: {
      file: {
        type: "string",
        description: "backup file uploaded. Has to be a zip file.",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/backup-restore/restore/site/upload",
    body: ["file"],
    contentType: "multipart/form-data",
  },
});
