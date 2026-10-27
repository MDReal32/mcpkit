import { defineTool } from "@usemcpkit/core";

export const channelsThreadMembersJoinThread = defineTool({
  name: "channels:thread_members:join_thread",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "PUT",
    path: "/channels/{channel_id}/thread-members/@me",
  },
});
