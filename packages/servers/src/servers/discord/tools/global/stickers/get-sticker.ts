import { defineTool } from "@usemcpkit/core";

export const globalStickersGetSticker = defineTool({
  name: "global:stickers:get_sticker",
  description: "",
  input: {
    type: "object",
    properties: {
      sticker_id: {
        type: "string",
      },
    },
    required: ["sticker_id"],
  },
  request: {
    method: "GET",
    path: "/stickers/{sticker_id}",
  },
});
