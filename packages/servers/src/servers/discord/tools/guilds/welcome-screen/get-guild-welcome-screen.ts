import { defineTool } from "@usemcpkit/core";

export const guildsWelcomeScreenGetGuildWelcomeScreen = defineTool({
  name: "guilds:welcome_screen:get_guild_welcome_screen",
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
    path: "/guilds/{guild_id}/welcome-screen",
  },
});
