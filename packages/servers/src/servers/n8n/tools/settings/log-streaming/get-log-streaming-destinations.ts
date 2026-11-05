import { defineTool } from "@usemcpkit/core";

export const settingsLogStreamingGetLogStreamingDestinations = defineTool({
  name: "settings:log_streaming:get_log_streaming_destinations",
  description:
    "List log streaming destinations. List the configured log streaming destinations. Requires the `eventBusDestination:list` scope and the Log Streaming feature to be licensed.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/settings/log-streaming/destinations",
  },
});
