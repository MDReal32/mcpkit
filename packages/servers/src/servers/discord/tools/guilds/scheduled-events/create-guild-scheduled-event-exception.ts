import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsCreateGuildScheduledEventException = defineTool({
  name: "guilds:scheduled_events:create_guild_scheduled_event_exception",
  description: ". Create an exception to a recurring guild scheduled event",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      guild_scheduled_event_id: {
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
      original_scheduled_start_time: {
        type: "string",
        description: "The original start time of the occurrence to create an exception for",
      },
      is_canceled: {
        type: "boolean",
        description: "Whether this occurrence is canceled",
      },
    },
    required: ["guild_id", "guild_scheduled_event_id", "original_scheduled_start_time"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions",
    body: ["scheduled_start_time", "scheduled_end_time", "original_scheduled_start_time", "is_canceled"],
  },
});
