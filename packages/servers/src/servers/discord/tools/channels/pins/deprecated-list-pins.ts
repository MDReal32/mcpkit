import { defineTool } from "@usemcpkit/core";

export const channelsPinsDeprecatedListPins = defineTool({
  name: "channels:pins:deprecated_list_pins",
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
    path: "/channels/{channel_id}/pins",
  },
});
