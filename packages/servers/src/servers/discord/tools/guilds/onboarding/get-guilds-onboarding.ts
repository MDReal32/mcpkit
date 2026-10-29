import { defineTool } from "@usemcpkit/core";

export const guildsOnboardingGetGuildsOnboarding = defineTool({
  name: "guilds:onboarding:get_guilds_onboarding",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/onboarding",
  },
});
