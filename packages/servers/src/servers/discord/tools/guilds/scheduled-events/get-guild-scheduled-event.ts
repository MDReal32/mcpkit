import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsGetGuildScheduledEvent = defineTool({
  name: "guilds:scheduled_events:get_guild_scheduled_event",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      guild_scheduled_event_id: {
        type: "string",
      },
      with_user_count: {
        type: "boolean",
      },
    },
    required: ["guild_id", "guild_scheduled_event_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
    query: ["with_user_count"],
  },
});
