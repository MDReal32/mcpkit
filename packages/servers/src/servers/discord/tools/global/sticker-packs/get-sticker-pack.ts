import { defineTool } from "@usemcpkit/core";

export const globalStickerPacksGetStickerPack = defineTool({
  name: "global:sticker_packs:get_sticker_pack",
  description: "",
  input: {
    type: "object",
    properties: {
      pack_id: {
        type: "string",
      },
    },
    required: ["pack_id"],
  },
  request: {
    method: "GET",
    path: "/sticker-packs/{pack_id}",
  },
});
