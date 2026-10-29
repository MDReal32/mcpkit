import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsDeleteGuildScheduledEvent = defineTool({
  name: "guilds:scheduled_events:delete_guild_scheduled_event",
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
    },
    required: ["guild_id", "guild_scheduled_event_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
  },
});
