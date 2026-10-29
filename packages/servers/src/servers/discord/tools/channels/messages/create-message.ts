import { defineTool } from "@usemcpkit/core";

export const channelsMessagesCreateMessage = defineTool({
  name: "channels:messages:create_message",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
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
      flags: {
        type: "integer",
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
      poll: {
        type: "object",
        properties: {
          question: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "The text of the field",
              },
              emoji: {
                type: "object",
                description: "The emoji of the field",
              },
            },
          },
          answers: {
            type: "array",
            description: "Each of the answers available in the poll, up to 10",
            items: {
              type: "object",
            },
          },
          allow_multiselect: {
            type: "boolean",
            description: "Whether a user can select multiple answers",
          },
          layout_type: {
            description: "The layout type of the poll. Defaults to... DEFAULT!",
          },
          duration: {
            type: "integer",
            description: "Number of hours the poll should be open for, up to 32 days. Defaults to 24",
          },
        },
      },
      shared_client_theme: {
        type: "object",
        properties: {
          colors: {
            type: "array",
            items: {
              type: "string",
            },
          },
          gradient_angle: {
            type: "integer",
          },
          base_mix: {
            type: "integer",
          },
          base_theme: {},
        },
      },
      message_reference: {
        type: "object",
        properties: {
          guild_id: {},
          channel_id: {},
          message_id: {
            type: "string",
          },
          fail_if_not_exists: {
            type: "boolean",
          },
          type: {},
        },
      },
      nonce: {},
      enforce_nonce: {
        type: "boolean",
      },
      tts: {
        type: "boolean",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/messages",
    body: [
      "content",
      "embeds",
      "allowed_mentions",
      "sticker_ids",
      "components",
      "flags",
      "attachments",
      "poll",
      "shared_client_theme",
      "message_reference",
      "nonce",
      "enforce_nonce",
      "tts",
    ],
  },
});
