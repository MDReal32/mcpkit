import { defineTool } from "@usemcpkit/core";

export const channelsMessagesListMessages = defineTool({
  name: "channels:messages:list_messages",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      around: {
        type: "string",
      },
      before: {
        type: "string",
      },
      after: {
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
    path: "/channels/{channel_id}/messages",
    query: ["around", "before", "after", "limit"],
  },
});
