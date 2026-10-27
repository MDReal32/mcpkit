import { defineTool } from "@usemcpkit/core";

export const channelsThreadMembersLeaveThread = defineTool({
  name: "channels:thread_members:leave_thread",
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
    method: "DELETE",
    path: "/channels/{channel_id}/thread-members/@me",
  },
});
