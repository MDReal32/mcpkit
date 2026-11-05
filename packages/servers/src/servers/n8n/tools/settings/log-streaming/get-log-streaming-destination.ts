import { defineTool } from "@usemcpkit/core";

export const settingsLogStreamingGetLogStreamingDestination = defineTool({
  name: "settings:log_streaming:get_log_streaming_destination",
  description:
    "Retrieve a log streaming destination. Retrieve a single log streaming destination by id. Requires the `eventBusDestination:read` scope and the Log Streaming feature to be licensed.",
  input: {
    type: "object",
    properties: {
      destinationId: {
        type: "string",
        description: "The id of the log streaming destination.",
      },
    },
    required: ["destinationId"],
  },
  request: {
    method: "GET",
    path: "/settings/log-streaming/destinations/{destinationId}",
  },
});
