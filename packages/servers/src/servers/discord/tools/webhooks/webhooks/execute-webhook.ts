import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksExecuteWebhook = defineTool({
  name: "webhooks:webhooks:execute_webhook",
  description: "",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
      },
      webhook_token: {
        type: "string",
      },
      wait: {
        type: "boolean",
      },
      thread_id: {
        type: "string",
      },
      with_components: {
        type: "boolean",
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
      tts: {
        type: "boolean",
      },
      flags: {
        type: "integer",
      },
      username: {
        type: "string",
      },
      avatar_url: {
        type: "string",
      },
      thread_name: {
        type: "string",
      },
      applied_tags: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["webhook_id", "webhook_token"],
  },
  request: {
    method: "POST",
    path: "/webhooks/{webhook_id}/{webhook_token}",
    query: ["wait", "thread_id", "with_components"],
    body: [
      "content",
      "embeds",
      "allowed_mentions",
      "components",
      "attachments",
      "poll",
      "tts",
      "flags",
      "username",
      "avatar_url",
      "thread_name",
      "applied_tags",
    ],
  },
});
