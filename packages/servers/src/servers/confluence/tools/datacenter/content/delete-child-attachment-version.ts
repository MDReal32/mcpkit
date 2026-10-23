import { defineTool } from "@usemcpkit/core";

export const datacenterContentDeleteChildAttachmentVersion = defineTool({
  name: "datacenter:content:delete_child_attachment_version",
  description:
    "[Data Center] Remove attachment version. This method will delete the specified version of an attachment identified by attachmentId and version.",
  input: {
    type: "object",
    properties: {
      attachmentId: {
        type: "string",
        description: "The id of the attachment to be removed.",
      },
      id: {
        type: "string",
        description: "The id of the content the attachment is on.",
      },
      version: {
        type: "integer",
      },
    },
    required: ["attachmentId", "id", "version"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/content/{id}/child/attachment/{attachmentId}/version/{version}",
  },
});
