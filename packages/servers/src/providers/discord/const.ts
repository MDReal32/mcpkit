import type { Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const DISCORD_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "communication",
  version: "1.0.0",
  baseUrl: "https://discord.com/api/v10",
  headers: { Accept: "application/json" },
  auth: [
    {
      type: "header",
      name: "Authorization",
      prefix: "Bot ",
      env: "DISCORD_BOT_TOKEN",
      label: "Bot token",
      ui: defineUI({
        inputs: {
          DISCORD_BOT_TOKEN: {
            label: "Bot token",
            placeholder: "MTA…",
            hint: "Reset it under your application's Bot page in the Discord Developer Portal; or set the DISCORD_BOT_TOKEN environment variable.",
          },
        },
        actions: [
          {
            type: "link",
            label: "Open the Developer Portal ↗",
            url: "https://discord.com/developers/applications",
          },
        ],
      }),
    },
  ],
};
