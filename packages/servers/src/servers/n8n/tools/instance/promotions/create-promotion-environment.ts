import { defineTool } from "@usemcpkit/core";

export const instancePromotionsCreatePromotionEnvironment = defineTool({
  name: "instance:promotions:create_promotion_environment",
  description:
    "Create a promotion environment. Creates an environment for one direction on an existing provider. The settings must match the direction. A GitLab remote URL must belong to the saved provider. The environment stores only the repository path and derives remoteUrl from the current provider base URL. Plain Git environments keep the full remote URL. The instance can have one environment for each direction.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      scope: {
        type: "string",
        enum: ["instance", "projects"],
      },
      providerId: {
        type: "string",
      },
      remote: {
        type: "object",
        properties: {
          schemaVersion: {
            type: "number",
            enum: [1],
          },
          remoteUrl: {
            type: "string",
          },
        },
        required: ["schemaVersion", "remoteUrl"],
      },
      direction: {
        type: "string",
        enum: ["promote"],
      },
      settings: {
        type: "object",
        properties: {
          schemaVersion: {
            type: "number",
            enum: [1],
          },
          baseBranchName: {
            type: "string",
          },
          createBranchOnPromotion: {
            type: "boolean",
          },
        },
        required: ["schemaVersion", "baseBranchName", "createBranchOnPromotion"],
      },
    },
    required: ["name", "scope", "providerId", "remote", "direction", "settings"],
  },
  request: {
    method: "POST",
    path: "/promotions/environments",
    body: ["name", "scope", "providerId", "remote", "direction", "settings"],
  },
});
