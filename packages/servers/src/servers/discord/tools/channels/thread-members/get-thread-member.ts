import { defineTool } from "@usemcpkit/core";

export const channelsThreadMembersGetThreadMember = defineTool({
  name: "channels:thread_members:get_thread_member",
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
      with_member: {
        type: "boolean",
      },
    },
    required: ["channel_id", "user_id"],
  },
  request: {
    method: "GET",
    path: "/channels/{channel_id}/thread-members/{user_id}",
    query: ["with_member"],
  },
});
