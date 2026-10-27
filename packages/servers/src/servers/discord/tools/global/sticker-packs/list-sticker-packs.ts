import { defineTool } from "@usemcpkit/core";

export const globalStickerPacksListStickerPacks = defineTool({
  name: "global:sticker_packs:list_sticker_packs",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/sticker-packs",
  },
});
