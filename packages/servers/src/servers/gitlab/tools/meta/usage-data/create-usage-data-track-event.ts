import { defineTool } from "@usemcpkit/core";

export const metaUsageDataCreateUsageDataTrackEvent = defineTool({
  name: "meta:usage_data:create_usage_data_track_event",
  description:
    "Track an internal GitLab event. Tracks a GitLab internal event. This action increments Service Ping counters in Redis and is optionally sent to Snowplow. Introduced in GitLab 16.2.",
  input: {
    type: "object",
    properties: {
      event: {
        type: "string",
        description: "Name of the event to track.",
      },
      namespace_id: {
        type: "integer",
        description: "ID of the namespace associated with the event.",
      },
      project_id: {
        type: "integer",
        description: "ID of the project. Mutually exclusive with `project_path`.",
      },
      project_path: {
        type: "string",
        description:
          "Path of the project. Used to find `project_id` when it is not provided. Mutually exclusive with `project_id`.",
      },
      additional_properties: {
        type: "object",
        description: "Additional properties to be tracked.",
      },
      send_to_snowplow: {
        type: "boolean",
        description: "If `true`, sends the tracked event to Snowplow.",
      },
    },
    required: ["event"],
  },
  request: {
    method: "POST",
    path: "/usage_data/track_event",
    body: ["event", "namespace_id", "project_id", "project_path", "additional_properties", "send_to_snowplow"],
  },
});
