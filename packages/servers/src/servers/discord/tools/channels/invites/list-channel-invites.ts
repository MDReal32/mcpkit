import { defineTool } from "@usemcpkit/core";

export const channelsInvitesListChannelInvites = defineTool({
  name: "channels:invites:list_channel_invites",
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
    path: "/channels/{channel_id}/invites",
  },
});
