import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentUpdateAttachmentData = defineTool({
  name: "cloud_v1:content:update_attachment_data",
  description:
    "[Cloud v1] Update attachment data. Updates the binary data of an attachment, given the attachment ID, and optionally the comment and the minor edit field.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content that the attachment is attached to.",
      },
      attachmentId: {
        type: "string",
        description: "The ID of the attachment to update.",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      comment: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      minorEdit: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "attachmentId", "file", "minorEdit"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/content/{id}/child/attachment/{attachmentId}/data",
    body: ["file", "comment", "minorEdit"],
    contentType: "multipart/form-data",
    fileArgs: ["file", "comment", "minorEdit"],
  },
});
