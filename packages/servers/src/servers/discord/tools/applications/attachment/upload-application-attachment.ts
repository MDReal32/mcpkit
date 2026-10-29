import { defineTool } from "@usemcpkit/core";

export const applicationsAttachmentUploadApplicationAttachment = defineTool({
  name: "applications:attachment:upload_application_attachment",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["application_id", "file"],
  },
  request: {
    method: "POST",
    path: "/applications/{application_id}/attachment",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
