import type { Manifest, OpenApiSource } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

/** Discord's description at a pinned commit; the endpoints that take only a user's OAuth2 token are left out. */
export const DISCORD_SOURCES: OpenApiSource[] = [
  {
    name: "v10",
    url: "https://raw.githubusercontent.com/discord/discord-api-spec/3a21a01249a763cd47f1dfec3da91c5ba71bb974/specs/openapi.json",
    sha256: "ef338088f4c6a73fdb9840acd1ce2bf8f16c1870f4437bfc563418c7e0de7278",
    basePath: "",
    options: { security: ["BotToken"] },
  },
];

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
