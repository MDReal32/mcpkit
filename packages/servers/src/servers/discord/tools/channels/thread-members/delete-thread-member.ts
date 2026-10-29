import { defineTool } from "@usemcpkit/core";

export const channelsThreadMembersDeleteThreadMember = defineTool({
  name: "channels:thread_members:delete_thread_member",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["channel_id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/channels/{channel_id}/thread-members/{user_id}",
  },
});
