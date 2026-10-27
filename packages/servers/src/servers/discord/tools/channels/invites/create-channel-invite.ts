import { defineTool } from "@usemcpkit/core";

export const channelsInvitesCreateChannelInvite = defineTool({
  name: "channels:invites:create_channel_invite",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      max_age: {
        type: "integer",
      },
      temporary: {
        type: "boolean",
      },
      max_uses: {
        type: "integer",
      },
      unique: {
        type: "boolean",
      },
      target_user_id: {},
      target_application_id: {},
      target_type: {},
      role_ids: {},
      target_user_ids: {
        description: "The IDs of the users to target with this invite.",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/invites",
    body: [
      "max_age",
      "temporary",
      "max_uses",
      "unique",
      "target_user_id",
      "target_application_id",
      "target_type",
      "role_ids",
      "target_user_ids",
    ],
  },
});
