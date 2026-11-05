import { defineTool } from "@usemcpkit/core";

export const settingsLogStreamingGetLogStreamingEventTypes = defineTool({
  name: "settings:log_streaming:get_log_streaming_event_types",
  description:
    "List streamable event types. List the event types that can be streamed to a log streaming destination. Requires the `eventBusDestination:list` scope and the Log Streaming feature to be licensed.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/settings/log-streaming/event-types",
  },
});
