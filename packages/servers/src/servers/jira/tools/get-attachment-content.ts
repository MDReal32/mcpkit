import { defineTool } from "@usemcpkit/core";

/** Data Center has no REST download: it serves the file at the `content` URL of the attachment's metadata. */
export const getAttachmentContent = defineTool({
  name: "rest/api/2/attachment/content/{id}:get",
  description:
    "Download an attachment: saves the file to a local path. Data Center serves it by id and file name, as the attachment's metadata (rest/api/2/attachment/{id}:get) gives them.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the attachment.",
      },
      filename: {
        type: "string",
        description: "The file name of the attachment, as its metadata gives it.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["id", "filename", "save_to"],
  },
  request: {
    method: "GET",
    path: "/secure/attachment/{id}/{filename}",
    saveToArg: "save_to",
  },
  applies: { sources: ["datacenter"] },
});
