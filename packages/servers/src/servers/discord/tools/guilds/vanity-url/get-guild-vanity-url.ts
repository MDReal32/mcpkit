import { defineTool } from "@usemcpkit/core";

export const guildsVanityUrlGetGuildVanityUrl = defineTool({
  name: "guilds:vanity_url:get_guild_vanity_url",
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
    path: "/guilds/{guild_id}/vanity-url",
  },
});
