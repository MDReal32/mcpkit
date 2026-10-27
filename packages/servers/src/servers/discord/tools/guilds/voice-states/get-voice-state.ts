import { defineTool } from "@usemcpkit/core";

export const guildsVoiceStatesGetVoiceState = defineTool({
  name: "guilds:voice_states:get_voice_state",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["guild_id", "user_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/voice-states/{user_id}",
  },
});
