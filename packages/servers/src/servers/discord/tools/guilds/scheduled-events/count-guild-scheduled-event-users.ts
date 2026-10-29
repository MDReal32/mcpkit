import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsCountGuildScheduledEventUsers = defineTool({
  name: "guilds:scheduled_events:count_guild_scheduled_event_users",
  description: ". Get the count of users subscribed to a guild scheduled event",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      guild_scheduled_event_id: {
        type: "string",
      },
      guild_scheduled_event_exception_ids: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["guild_id", "guild_scheduled_event_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts",
    query: ["guild_scheduled_event_exception_ids"],
  },
});
