import { defineTool } from "@usemcpkit/core";

export const channelsChannelsDeleteChannel = defineTool({
  name: "channels:channels:delete_channel",
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
    path: "/channels/{channel_id}",
  },
});
