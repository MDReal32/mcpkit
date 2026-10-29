import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsCreateGuildScheduledEvent = defineTool({
  name: "guilds:scheduled_events:create_guild_scheduled_event",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
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
      privacy_level: {
        type: "integer",
      },
      entity_type: {
        type: "integer",
        enum: [2],
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
    required: ["guild_id", "name", "scheduled_start_time", "privacy_level", "entity_type"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/scheduled-events",
    body: [
      "name",
      "description",
      "image",
      "scheduled_start_time",
      "scheduled_end_time",
      "privacy_level",
      "entity_type",
      "channel_id",
      "recurrence_rule",
      "entity_metadata",
    ],
  },
});
