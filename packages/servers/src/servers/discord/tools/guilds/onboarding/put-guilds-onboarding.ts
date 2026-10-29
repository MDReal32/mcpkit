import { defineTool } from "@usemcpkit/core";

export const guildsOnboardingPutGuildsOnboarding = defineTool({
  name: "guilds:onboarding:put_guilds_onboarding",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      prompts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            options: {
              type: "array",
              items: {
                type: "object",
              },
            },
            single_select: {
              type: "boolean",
            },
            required: {
              type: "boolean",
            },
            in_onboarding: {
              type: "boolean",
            },
            type: {},
            id: {
              type: "string",
            },
          },
          required: ["title", "options", "id"],
        },
      },
      enabled: {
        type: "boolean",
      },
      default_channel_ids: {
        type: "array",
        items: {
          type: "string",
        },
      },
      mode: {},
    },
    required: ["guild_id"],
  },
  request: {
    method: "PUT",
    path: "/guilds/{guild_id}/onboarding",
    body: ["prompts", "enabled", "default_channel_ids", "mode"],
  },
});
