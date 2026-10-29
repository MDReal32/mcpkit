import { defineTool } from "@usemcpkit/core";

export const lobbiesPartnerSdkPartnerSdkUnmergeProvisionalAccount = defineTool({
  name: "lobbies:partner_sdk:partner_sdk_unmerge_provisional_account",
  description: "",
  input: {
    type: "object",
    properties: {
      client_id: {
        type: "string",
      },
      client_secret: {
        type: "string",
      },
      external_auth_token: {
        type: "string",
      },
      external_auth_type: {
        type: "string",
      },
    },
    required: ["client_id", "external_auth_token", "external_auth_type"],
  },
  request: {
    method: "POST",
    path: "/partner-sdk/provisional-accounts/unmerge",
    body: ["client_id", "client_secret", "external_auth_token", "external_auth_type"],
  },
});
