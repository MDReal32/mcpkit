import { defineTool } from "@usemcpkit/core";

export const channelsMessagesUpdateMessage = defineTool({
  name: "channels:messages:update_message",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      message_id: {
        type: "string",
      },
      content: {
        type: "string",
      },
      embeds: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: {
              type: "string",
            },
            url: {
              type: "string",
            },
            title: {
              type: "string",
            },
            color: {
              type: "integer",
            },
            timestamp: {
              type: "string",
            },
            description: {
              type: "string",
            },
            author: {
              type: "object",
            },
            image: {
              type: "object",
            },
            thumbnail: {
              type: "object",
            },
            footer: {
              type: "object",
            },
            fields: {
              type: "array",
              items: {
                type: "object",
              },
            },
            provider: {
              type: "object",
            },
            video: {
              type: "object",
            },
            audio: {
              type: "object",
            },
          },
        },
      },
      flags: {
        type: "integer",
      },
      allowed_mentions: {
        type: "object",
        properties: {
          parse: {
            type: "array",
            items: {},
          },
          users: {
            type: "array",
            items: {},
          },
          roles: {
            type: "array",
            items: {},
          },
          replied_user: {
            type: "boolean",
          },
        },
      },
      sticker_ids: {
        type: "array",
        items: {
          type: "string",
        },
      },
      components: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: {
              type: "integer",
              enum: [10],
            },
            id: {
              type: "integer",
            },
            components: {
              type: "array",
              items: {
                type: "object",
              },
            },
            accent_color: {
              type: "integer",
            },
            spoiler: {
              type: "boolean",
            },
            file: {
              type: "object",
            },
            items: {
              type: "array",
              items: {
                type: "object",
              },
            },
            accessory: {
              type: "object",
            },
            spacing: {},
            divider: {
              type: "boolean",
            },
            content: {
              type: "string",
            },
          },
          required: ["type"],
        },
      },
      attachments: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            filename: {
              type: "string",
            },
            description: {
              type: "string",
            },
            duration_secs: {
              type: "number",
            },
            waveform: {
              type: "string",
            },
            title: {
              type: "string",
            },
            is_spoiler: {
              type: "boolean",
            },
          },
          required: ["id"],
        },
      },
    },
    required: ["channel_id", "message_id"],
  },
  request: {
    method: "PATCH",
    path: "/channels/{channel_id}/messages/{message_id}",
    body: ["content", "embeds", "flags", "allowed_mentions", "sticker_ids", "components", "attachments"],
  },
});
