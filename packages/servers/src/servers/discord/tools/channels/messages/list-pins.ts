import { defineTool } from "@usemcpkit/core";

export const channelsMessagesListPins = defineTool({
  name: "channels:messages:list_pins",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      before: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "GET",
    path: "/channels/{channel_id}/messages/pins",
    query: ["before", "limit"],
  },
});
