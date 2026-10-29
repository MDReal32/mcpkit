import { defineTool } from "@usemcpkit/core";

export const guildsNewMemberWelcomeGetGuildNewMemberWelcome = defineTool({
  name: "guilds:new_member_welcome:get_guild_new_member_welcome",
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
    path: "/guilds/{guild_id}/new-member-welcome",
  },
});
