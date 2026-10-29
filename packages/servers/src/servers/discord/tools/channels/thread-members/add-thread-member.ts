import { defineTool } from "@usemcpkit/core";

export const channelsThreadMembersAddThreadMember = defineTool({
  name: "channels:thread_members:add_thread_member",
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
    method: "PUT",
    path: "/channels/{channel_id}/thread-members/{user_id}",
  },
});
