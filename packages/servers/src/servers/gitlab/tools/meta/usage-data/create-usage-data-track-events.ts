import { defineTool } from "@usemcpkit/core";

export const metaUsageDataCreateUsageDataTrackEvents = defineTool({
  name: "meta:usage_data:create_usage_data_track_events",
  description:
    "Track multiple internal GitLab events. Tracks one or more GitLab internal events in a single request. Each event increments Service Ping counters in Redis and is optionally sent to Snowplow. This feature was introduced in GitLab 17.3.",
  input: {
    type: "object",
    properties: {
      events: {
        type: "array",
        description: "Array of internal events to track. Maximum of 50 events.",
        items: {
          type: "object",
        },
      },
    },
    required: ["events"],
  },
  request: {
    method: "POST",
    path: "/usage_data/track_events",
    body: ["events"],
  },
});
