import { defineTool } from "@usemcpkit/core";

export const adminBroadcastMessagesGetBroadcastMessages = defineTool({
  name: "admin:broadcast_messages:get_broadcast_messages",
  description: "Retrieve a broadcast message. Retrieves a specified broadcast message.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the broadcast message.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/broadcast_messages/{id}",
  },
});
