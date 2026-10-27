import { defineTool } from "@usemcpkit/core";

export const channelsThreadMembersListThreadMembers = defineTool({
  name: "channels:thread_members:list_thread_members",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      with_member: {
        type: "boolean",
      },
      limit: {
        type: "integer",
      },
      after: {
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "GET",
    path: "/channels/{channel_id}/thread-members",
    query: ["with_member", "limit", "after"],
  },
});
