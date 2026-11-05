import { defineTool } from "@usemcpkit/core";

export const settingsLogStreamingTestLogStreamingDestination = defineTool({
  name: "settings:log_streaming:test_log_streaming_destination",
  description:
    "Send a test message to a log streaming destination. Send a test message to the destination to verify it is reachable and configured correctly. Requires the `eventBusDestination:test` scope and the Log Streaming feature to be licensed.",
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
    method: "POST",
    path: "/settings/log-streaming/destinations/{destinationId}/test",
  },
});
