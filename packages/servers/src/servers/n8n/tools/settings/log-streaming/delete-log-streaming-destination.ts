import { defineTool } from "@usemcpkit/core";

export const settingsLogStreamingDeleteLogStreamingDestination = defineTool({
  name: "settings:log_streaming:delete_log_streaming_destination",
  description:
    "Delete a log streaming destination. Remove a log streaming destination. Requires the `eventBusDestination:delete` scope and the Log Streaming feature to be licensed. When destinations are managed via environment variables, the delete is rejected with 409 and nothing is removed; reads still return the current values.",
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
    method: "DELETE",
    path: "/settings/log-streaming/destinations/{destinationId}",
  },
});
