import { defineTool } from "@usemcpkit/core";

export const instancePromotionsUpdatePromotionEnvironment = defineTool({
  name: "instance:promotions:update_promotion_environment",
  description:
    "Update a promotion environment. Updates the name, provider, remote, or settings. A remote replaces the whole saved remote, and settings replace the whole saved settings. The settings must match the direction of the environment, so `createBranchOnPromotion` is always required for Promote. GitLab environments store a repository path and derive remoteUrl from the provider. Plain Git environments keep the full remote URL. If the pr…",
  input: {
    type: "object",
    properties: {
      promotionEnvironmentId: {
        type: "string",
        description: "The ID of the promotion environment.",
      },
      name: {
        type: "string",
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
      settings: {
        type: "object",
        properties: {
          schemaVersion: {
            type: "number",
            enum: [1],
          },
          branchName: {
            type: "string",
          },
          baseBranchName: {
            type: "string",
          },
          createBranchOnPromotion: {
            type: "boolean",
          },
        },
        required: ["schemaVersion"],
      },
    },
    required: ["promotionEnvironmentId"],
  },
  request: {
    method: "PUT",
    path: "/promotions/environments/{promotionEnvironmentId}",
    body: ["name", "providerId", "remote", "settings"],
  },
});
