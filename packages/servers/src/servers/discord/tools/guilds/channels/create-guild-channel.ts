import { defineTool } from "@usemcpkit/core";

export const guildsChannelsCreateGuildChannel = defineTool({
  name: "guilds:channels:create_guild_channel",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      type: {},
      name: {
        type: "string",
      },
      position: {
        type: "integer",
      },
      topic: {
        type: "string",
      },
      bitrate: {
        type: "integer",
      },
      user_limit: {
        type: "integer",
      },
      nsfw: {
        type: "boolean",
      },
      rate_limit_per_user: {
        type: "integer",
      },
      parent_id: {},
      permission_overwrites: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            type: {},
            allow: {
              type: "integer",
            },
            deny: {
              type: "integer",
            },
          },
          required: ["id"],
        },
      },
      rtc_region: {
        type: "string",
      },
      video_quality_mode: {},
      default_auto_archive_duration: {},
      default_reaction_emoji: {
        type: "object",
        properties: {
          emoji_id: {},
          emoji_name: {
            type: "string",
          },
        },
      },
      default_thread_rate_limit_per_user: {
        type: "integer",
      },
      default_sort_order: {},
      default_forum_layout: {},
      default_tag_setting: {},
      available_tags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            emoji_id: {},
            emoji_name: {
              type: "string",
            },
            moderated: {
              type: "boolean",
            },
          },
        },
      },
    },
    required: ["guild_id", "name"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/channels",
    body: [
      "type",
      "name",
      "position",
      "topic",
      "bitrate",
      "user_limit",
      "nsfw",
      "rate_limit_per_user",
      "parent_id",
      "permission_overwrites",
      "rtc_region",
      "video_quality_mode",
      "default_auto_archive_duration",
      "default_reaction_emoji",
      "default_thread_rate_limit_per_user",
      "default_sort_order",
      "default_forum_layout",
      "default_tag_setting",
      "available_tags",
    ],
  },
});
