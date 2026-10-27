import { defineTool } from "@usemcpkit/core";

export const globalVoiceListVoiceRegions = defineTool({
  name: "global:voice:list_voice_regions",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/voice/regions",
  },
});
