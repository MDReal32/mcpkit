import { defineTool } from "@usemcpkit/core";

export const channelsChannelsGetChannel = defineTool({
  name: "channels:channels:get_channel",
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
    method: "GET",
    path: "/channels/{channel_id}",
  },
});
