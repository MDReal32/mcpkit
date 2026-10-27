import { defineTool } from "@usemcpkit/core";

export const channelsChannelsUpdateChannel = defineTool({
  name: "channels:channels:update_channel",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      icon: {
        type: "string",
      },
      type: {},
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
      flags: {
        type: "integer",
      },
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
            id: {},
          },
          required: ["name"],
        },
      },
      archived: {
        type: "boolean",
      },
      locked: {
        type: "boolean",
      },
      invitable: {
        type: "boolean",
      },
      auto_archive_duration: {},
      applied_tags: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "PATCH",
    path: "/channels/{channel_id}",
    body: [
      "name",
      "icon",
      "type",
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
      "flags",
      "available_tags",
      "archived",
      "locked",
      "invitable",
      "auto_archive_duration",
      "applied_tags",
    ],
  },
});
