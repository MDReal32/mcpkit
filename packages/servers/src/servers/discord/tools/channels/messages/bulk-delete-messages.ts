import { defineTool } from "@usemcpkit/core";

export const channelsMessagesBulkDeleteMessages = defineTool({
  name: "channels:messages:bulk_delete_messages",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      messages: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["channel_id", "messages"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/messages/bulk-delete",
    body: ["messages"],
  },
});
