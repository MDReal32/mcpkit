import { defineTool } from "@usemcpkit/core";

export const guildsGuildsUpdateGuild = defineTool({
  name: "guilds:guilds:update_guild",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      region: {
        type: "string",
      },
      icon: {
        type: "string",
      },
      verification_level: {},
      default_message_notifications: {},
      explicit_content_filter: {},
      preferred_locale: {},
      afk_timeout: {},
      afk_channel_id: {},
      system_channel_id: {},
      splash: {
        type: "string",
      },
      banner: {
        type: "string",
      },
      system_channel_flags: {
        type: "integer",
      },
      features: {
        type: "array",
        items: {
          type: "string",
        },
      },
      discovery_splash: {
        type: "string",
      },
      home_header: {
        type: "string",
      },
      rules_channel_id: {},
      safety_alerts_channel_id: {},
      public_updates_channel_id: {},
      premium_progress_bar_enabled: {
        type: "boolean",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}",
    body: [
      "name",
      "description",
      "region",
      "icon",
      "verification_level",
      "default_message_notifications",
      "explicit_content_filter",
      "preferred_locale",
      "afk_timeout",
      "afk_channel_id",
      "system_channel_id",
      "splash",
      "banner",
      "system_channel_flags",
      "features",
      "discovery_splash",
      "home_header",
      "rules_channel_id",
      "safety_alerts_channel_id",
      "public_updates_channel_id",
      "premium_progress_bar_enabled",
    ],
  },
});
