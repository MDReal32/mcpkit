import { defineTool } from "@usemcpkit/core";

export const instancePromotionsUpdatePromotionProvider = defineTool({
  name: "instance:promotions:update_promotion_provider",
  description:
    "Update a promotion provider. Renames the provider, and replaces its credentials when `auth` is sent. A Git host provider can also update its base URL. A different API destination requires `auth` in the same request. Changed credentials and host settings are validated before they save. If another request changes the credentials or configuration before this update saves, the update returns 409. Reload the provider and try agai…",
  input: {
    type: "object",
    properties: {
      promotionProviderId: {
        type: "string",
        description: "The ID of the promotion provider.",
      },
      name: {
        type: "string",
      },
      auth: {
        type: "object",
        properties: {
          authType: {
            type: "string",
            enum: ["token"],
          },
          keyType: {
            type: "string",
            enum: ["ed25519", "rsa"],
          },
          username: {
            type: "string",
            description:
              "Required for plain Git token authentication. For GitLab, the service ignores this field and uses n8n for Git transport.",
          },
          password: {
            type: "string",
          },
        },
        required: ["authType"],
      },
      config: {
        type: "object",
        properties: {
          schemaVersion: {
            type: "number",
            enum: [1],
          },
          baseUrl: {
            type: "string",
          },
        },
        required: ["schemaVersion", "baseUrl"],
      },
    },
    required: ["promotionProviderId"],
  },
  request: {
    method: "PUT",
    path: "/promotions/providers/{promotionProviderId}",
    body: ["name", "auth", "config"],
  },
});
