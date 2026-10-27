import { defineTool } from "@usemcpkit/core";

export const lobbiesPartnerSdkUpdateUserMessageExternalModerationMetadata = defineTool({
  name: "lobbies:partner_sdk:update_user_message_external_moderation_metadata",
  description: ". Update the external moderation metadata for a user message (DM).",
  input: {
    type: "object",
    properties: {
      user_id_1: {
        type: "string",
      },
      user_id_2: {
        type: "string",
      },
      message_id: {
        type: "string",
      },
      body: {
        type: "object",
        description: "The moderation metadata attached to the message",
      },
    },
    required: ["user_id_1", "user_id_2", "message_id", "body"],
  },
  request: {
    method: "PUT",
    path: "/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata",
    bodyArg: "body",
  },
});
