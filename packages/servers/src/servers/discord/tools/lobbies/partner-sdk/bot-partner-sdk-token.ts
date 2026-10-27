import { defineTool } from "@usemcpkit/core";

export const lobbiesPartnerSdkBotPartnerSdkToken = defineTool({
  name: "lobbies:partner_sdk:bot_partner_sdk_token",
  description: "",
  input: {
    type: "object",
    properties: {
      provisional_user_id: {},
      external_user_id: {
        type: "string",
      },
      preferred_global_name: {
        type: "string",
      },
    },
    required: ["external_user_id"],
  },
  request: {
    method: "POST",
    path: "/partner-sdk/token/bot",
    body: ["provisional_user_id", "external_user_id", "preferred_global_name"],
  },
});
