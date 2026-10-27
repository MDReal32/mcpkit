import { defineTool } from "@usemcpkit/core";

export const lobbiesChannelLinkingEditLobbyChannelLink = defineTool({
  name: "lobbies:channel_linking:edit_lobby_channel_link",
  description: "",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
      channel_id: {},
    },
    required: ["lobby_id"],
  },
  request: {
    method: "PATCH",
    path: "/lobbies/{lobby_id}/channel-linking",
    body: ["channel_id"],
  },
});
