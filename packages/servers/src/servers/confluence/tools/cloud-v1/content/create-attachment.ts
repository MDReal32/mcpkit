import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentCreateAttachment = defineTool({
  name: "cloud_v1:content:create_attachment",
  description:
    "[Cloud v1] Create attachment. Adds an attachment to a piece of content. This method only adds a new attachment. If you want to update an existing attachment, use Create or update attachments.",
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
        description: "The status of the content that the attachment is being added to.",
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
    method: "POST",
    path: "/wiki/rest/api/content/{id}/child/attachment",
    query: ["status"],
    body: ["file", "comment", "minorEdit"],
    contentType: "multipart/form-data",
    fileArgs: ["file", "comment", "minorEdit"],
  },
});
