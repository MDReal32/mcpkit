import { defineTool } from "@usemcpkit/core";

export const guildsWelcomeScreenUpdateGuildWelcomeScreen = defineTool({
  name: "guilds:welcome_screen:update_guild_welcome_screen",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      description: {
        type: "string",
      },
      welcome_channels: {
        type: "array",
        items: {
          type: "object",
          properties: {
            channel_id: {
              type: "string",
            },
            description: {
              type: "string",
            },
            emoji_id: {},
            emoji_name: {
              type: "string",
            },
          },
          required: ["channel_id", "description"],
        },
      },
      enabled: {
        type: "boolean",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/welcome-screen",
    body: ["description", "welcome_channels", "enabled"],
  },
});
