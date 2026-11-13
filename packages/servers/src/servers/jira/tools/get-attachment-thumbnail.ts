import { defineTool } from "@usemcpkit/core";

/** Data Center has no REST thumbnail: it serves it at the `thumbnail` URL of the attachment's metadata. */
export const getAttachmentThumbnail = defineTool({
  name: "rest/api/2/attachment/thumbnail/{id}:get",
  description: "Download the thumbnail of an image attachment: saves it to a local path as PNG.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the attachment.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["id", "save_to"],
  },
  request: {
    method: "GET",
    path: "/secure/thumbnail/{id}/_thumb_{id}.png",
    saveToArg: "save_to",
  },
  applies: { sources: ["datacenter"] },
});
