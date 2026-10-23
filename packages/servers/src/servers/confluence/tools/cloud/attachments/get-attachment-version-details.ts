import { defineTool } from "@usemcpkit/core";

export const cloudAttachmentsGetAttachmentVersionDetails = defineTool({
  name: "cloud:attachments:get_attachment_version_details",
  description:
    "[Cloud] Get version details for attachment version. Retrieves version details for the specified attachment and version number.",
  input: {
    type: "object",
    properties: {
      attachment_id: {
        type: "string",
        description: "The ID of the attachment for which version details should be returned.",
      },
      version_number: {
        type: "integer",
        description: "The version number of the attachment to be returned.",
      },
    },
    required: ["attachment_id", "version_number"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/attachments/{attachment_id}/versions/{version_number}",
  },
});
