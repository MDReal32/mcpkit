import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentCreateOrUpdateAttachments = defineTool({
  name: "cloud_v1:content:create_or_update_attachments",
  description:
    "[Cloud v1] Create or update attachment. Adds an attachment to a piece of content. If the attachment already exists for the content, then the attachment is updated (i.e. a new version of the attachment is created).",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content to add the attachment to.",
      },
      status: {
        type: "string",
        enum: ["current", "draft"],
        description:
          "The status of the content that the attachment is being added to. This should always be set to 'current'.",
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
    required: ["id", "file", "minorEdit"],
  },
  request: {
    method: "PUT",
    path: "/wiki/rest/api/content/{id}/child/attachment",
    query: ["status"],
    body: ["file", "comment", "minorEdit"],
    contentType: "multipart/form-data",
    fileArgs: ["file", "comment", "minorEdit"],
  },
});
