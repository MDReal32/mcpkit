import { defineTool } from "@usemcpkit/core";

export const datacenterContentCreateChildAttachmentData = defineTool({
  name: "datacenter:content:create_child_attachment_data",
  description:
    "[Data Center] Update binary data of an attachment. Update the binary data of an Attachment, and optionally the comment and the minor edit field.",
  input: {
    type: "object",
    properties: {
      attachmentId: {
        type: "string",
        description: "the id of the attachment to upload the new file for.",
      },
      id: {
        type: "string",
        description: "The id of the content the attachment is on.",
      },
      file: {
        type: "string",
        description: 'The name of the multipart/form-data parameter that contains attachments must be \\"file\\".',
      },
      comment: {
        type: "string",
        description:
          '(optional) a list of \\"comments\\" matching the list of attachment data.\\nIf supplied, the size of this list must match the size of the fileParts list.',
      },
      minorEdit: {
        type: "boolean",
        description:
          '(optional) form parameter indicating whether the attachments should be \\"minorEdits\\".If \\"minorEdits\\" is set to true, no notification email will be generated for that attachment.',
      },
      hidden: {
        type: "boolean",
        description:
          '(optional) form parameter indicating whether the attachments should be \\"hidden\\".If \\"hidden\\" is set to true, no notification email or activity stream will be generated for that attachment.',
      },
    },
    required: ["attachmentId", "id"],
  },
  request: {
    method: "POST",
    path: "/rest/api/content/{id}/child/attachment/{attachmentId}/data",
    body: ["file", "comment", "minorEdit", "hidden"],
    contentType: "multipart/form-data",
  },
});
