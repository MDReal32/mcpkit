import { defineTool } from "@usemcpkit/core";

export const cloudAttachmentsGetAttachmentContentPropertiesById = defineTool({
  name: "cloud:attachments:get_attachment_content_properties_by_id",
  description:
    "[Cloud] Get content property for attachment by id. Retrieves a specific Content Property by ID that is attached to a specified attachment.",
  input: {
    type: "object",
    properties: {
      attachment_id: {
        type: "string",
        description: "The ID of the attachment for which content properties should be returned.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the content property to be returned",
      },
    },
    required: ["attachment_id", "property_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/attachments/{attachment_id}/properties/{property_id}",
  },
});
