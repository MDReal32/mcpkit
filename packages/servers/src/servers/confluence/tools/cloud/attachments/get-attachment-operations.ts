import { defineTool } from "@usemcpkit/core";

export const cloudAttachmentsGetAttachmentOperations = defineTool({
  name: "cloud:attachments:get_attachment_operations",
  description:
    "[Cloud] Get permitted operations for attachment. Returns the permitted operations on specific attachment.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the attachment for which operations should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/attachments/{id}/operations",
  },
});
