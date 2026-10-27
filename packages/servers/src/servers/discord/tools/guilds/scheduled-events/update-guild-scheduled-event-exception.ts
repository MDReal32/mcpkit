import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsUpdateGuildScheduledEventException = defineTool({
  name: "guilds:scheduled_events:update_guild_scheduled_event_exception",
  description: ". Modify an exception to a recurring guild scheduled event",
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
      scheduled_start_time: {
        type: "string",
        description: "Overridden start time of this occurrence",
      },
      scheduled_end_time: {
        type: "string",
        description: "Overridden end time of this occurrence",
      },
      is_canceled: {
        type: "boolean",
        description: "Whether this occurrence is canceled",
      },
    },
    required: ["guild_id", "guild_scheduled_event_id", "exception_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}",
    body: ["scheduled_start_time", "scheduled_end_time", "is_canceled"],
  },
});
