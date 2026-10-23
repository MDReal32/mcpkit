import { defineTool } from "@usemcpkit/core";

export const cloudAttachmentsDeleteAttachmentPropertyById = defineTool({
  name: "cloud:attachments:delete_attachment_property_by_id",
  description:
    "[Cloud] Delete content property for attachment by id. Deletes a content property for an attachment by its id.",
  input: {
    type: "object",
    properties: {
      attachment_id: {
        type: "string",
        description: "The ID of the attachment the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be deleted.",
      },
    },
    required: ["attachment_id", "property_id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/attachments/{attachment_id}/properties/{property_id}",
  },
});
