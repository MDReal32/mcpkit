import { defineTool } from "@usemcpkit/core";

export const datacenterContentCreateChildAttachmentMove = defineTool({
  name: "datacenter:content:create_child_attachment_move",
  description: "[Data Center] Move attachment. Move an attachment to a different content entity object.",
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
      newName: {
        type: "string",
      },
      newContentId: {
        type: "string",
      },
    },
    required: ["attachmentId", "id"],
  },
  request: {
    method: "POST",
    path: "/rest/api/content/{id}/child/attachment/{attachmentId}/move",
    query: ["newName", "newContentId"],
  },
});
