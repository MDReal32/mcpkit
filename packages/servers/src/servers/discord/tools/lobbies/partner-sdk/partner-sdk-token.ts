import { defineTool } from "@usemcpkit/core";

export const lobbiesPartnerSdkPartnerSdkToken = defineTool({
  name: "lobbies:partner_sdk:partner_sdk_token",
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
    path: "/partner-sdk/token",
    body: ["client_id", "client_secret", "external_auth_token", "external_auth_type"],
  },
});
