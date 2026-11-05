import { defineTool } from "@usemcpkit/core";

export const instancePromotionsCreatePromotionProvider = defineTool({
  name: "instance:promotions:create_promotion_provider",
  description:
    "Create a promotion provider. Creates a provider and its authentication material. A Git host provider validates authenticated API access before it saves. For GitLab, the service uses n8n as the Git transport username. Its auth.username is optional. The service ignores any supplied username. Plain Git token authentication requires auth.username. An SSH provider returns the generated public key; add it to the remote as a deploy…",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      type: {
        type: "string",
        enum: ["git", "gitlab"],
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
            default: "ed25519",
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
    required: ["name", "type", "auth"],
  },
  request: {
    method: "POST",
    path: "/promotions/providers",
    body: ["name", "type", "auth", "config"],
  },
});
