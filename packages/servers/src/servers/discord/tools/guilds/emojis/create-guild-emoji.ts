import { defineTool } from "@usemcpkit/core";

export const guildsEmojisCreateGuildEmoji = defineTool({
  name: "guilds:emojis:create_guild_emoji",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      image: {
        type: "string",
      },
      roles: {
        type: "array",
        items: {},
      },
    },
    required: ["guild_id", "name", "image"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/emojis",
    body: ["name", "image", "roles"],
  },
});
