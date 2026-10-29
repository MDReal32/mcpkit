import { defineTool } from "@usemcpkit/core";

export const invitesInvitesInviteResolve = defineTool({
  name: "invites:invites:invite_resolve",
  description: "",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
      with_counts: {
        type: "boolean",
      },
      guild_scheduled_event_id: {
        type: "string",
      },
      target_channel_id: {
        type: "string",
      },
      target_message_id: {
        type: "string",
      },
    },
    required: ["code"],
  },
  request: {
    method: "GET",
    path: "/invites/{code}",
    query: ["with_counts", "guild_scheduled_event_id", "target_channel_id", "target_message_id"],
  },
});
