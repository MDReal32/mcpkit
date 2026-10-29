import { defineTool } from "@usemcpkit/core";

export const channelsMessagesCreateThreadFromMessage = defineTool({
  name: "channels:messages:create_thread_from_message",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      message_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      auto_archive_duration: {},
      rate_limit_per_user: {
        type: "integer",
      },
    },
    required: ["channel_id", "message_id", "name"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/messages/{message_id}/threads",
    body: ["name", "auto_archive_duration", "rate_limit_per_user"],
  },
});
