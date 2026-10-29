import { defineTool } from "@usemcpkit/core";

export const globalSoundboardDefaultSoundsGetSoundboardDefaultSounds = defineTool({
  name: "global:soundboard_default_sounds:get_soundboard_default_sounds",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/soundboard-default-sounds",
  },
});
