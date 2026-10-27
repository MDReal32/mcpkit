import { defineTool } from "@usemcpkit/core";

export const lobbiesPartnerSdkBotPartnerSdkUnmergeProvisionalAccount = defineTool({
  name: "lobbies:partner_sdk:bot_partner_sdk_unmerge_provisional_account",
  description: "",
  input: {
    type: "object",
    properties: {
      external_user_id: {
        type: "string",
      },
    },
    required: ["external_user_id"],
  },
  request: {
    method: "POST",
    path: "/partner-sdk/provisional-accounts/unmerge/bot",
    body: ["external_user_id"],
  },
});
