import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsListGuildScheduledEvents = defineTool({
  name: "guilds:scheduled_events:list_guild_scheduled_events",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      with_user_count: {
        type: "boolean",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/scheduled-events",
    query: ["with_user_count"],
  },
});
