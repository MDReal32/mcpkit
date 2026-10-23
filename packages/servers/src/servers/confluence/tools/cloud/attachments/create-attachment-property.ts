import { defineTool } from "@usemcpkit/core";

export const cloudAttachmentsCreateAttachmentProperty = defineTool({
  name: "cloud:attachments:create_attachment_property",
  description: "[Cloud] Create content property for attachment. Creates a new content property for an attachment.",
  input: {
    type: "object",
    properties: {
      attachment_id: {
        type: "string",
        description: "The ID of the attachment to create a property for.",
      },
      key: {
        type: "string",
        description: "Key of the content property",
      },
      value: {
        description: "Value of the content property.",
      },
    },
    required: ["attachment_id"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/attachments/{attachment_id}/properties",
    body: ["key", "value"],
  },
});
