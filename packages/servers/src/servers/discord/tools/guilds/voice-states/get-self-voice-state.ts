import { defineTool } from "@usemcpkit/core";

export const guildsVoiceStatesGetSelfVoiceState = defineTool({
  name: "guilds:voice_states:get_self_voice_state",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/voice-states/@me",
  },
});
