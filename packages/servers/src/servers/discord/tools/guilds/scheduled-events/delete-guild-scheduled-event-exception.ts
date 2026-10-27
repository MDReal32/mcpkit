import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsDeleteGuildScheduledEventException = defineTool({
  name: "guilds:scheduled_events:delete_guild_scheduled_event_exception",
  description: ". Delete an exception to a recurring guild scheduled event",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      guild_scheduled_event_id: {
        type: "string",
      },
      exception_id: {
        type: "string",
      },
    },
    required: ["guild_id", "guild_scheduled_event_id", "exception_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}",
  },
});
