import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsUpdateGuildScheduledEvent = defineTool({
  name: "guilds:scheduled_events:update_guild_scheduled_event",
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
      status: {},
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      image: {
        type: "string",
      },
      scheduled_start_time: {
        type: "string",
      },
      scheduled_end_time: {
        type: "string",
      },
      entity_type: {},
      privacy_level: {
        type: "integer",
      },
      channel_id: {},
      recurrence_rule: {
        type: "object",
        description: "Recurrence rule for the scheduled event",
        properties: {
          start: {
            type: "string",
            description: "Starting time of the recurrence interval",
          },
          end: {
            type: "string",
            description: "Ending time of the recurrence interval",
          },
          frequency: {
            type: "integer",
          },
          interval: {
            type: "integer",
            description: "The spacing between events, defined by frequency",
          },
          by_weekday: {
            type: "array",
            description: "Set of specific days within a week for the event to recur on",
            items: {
              type: "integer",
            },
          },
          by_n_weekday: {
            type: "array",
            description: "List of specific days within a specific week to recur on",
            items: {
              type: "object",
            },
          },
          by_month: {
            type: "array",
            description: "Set of specific months to recur on",
            items: {
              type: "integer",
            },
          },
          by_month_day: {
            type: "array",
            description: "Set of specific dates within a month to recur on",
            items: {
              type: "integer",
            },
          },
          by_year_day: {
            type: "array",
            description: "Set of days within a year to recur on (1-364)",
            items: {
              type: "integer",
            },
          },
          count: {
            type: "integer",
            description: "Total number of times the event is allowed to recur",
          },
        },
      },
      entity_metadata: {
        type: "object",
      },
    },
    required: ["guild_id", "guild_scheduled_event_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
    body: [
      "status",
      "name",
      "description",
      "image",
      "scheduled_start_time",
      "scheduled_end_time",
      "entity_type",
      "privacy_level",
      "channel_id",
      "recurrence_rule",
      "entity_metadata",
    ],
  },
});
