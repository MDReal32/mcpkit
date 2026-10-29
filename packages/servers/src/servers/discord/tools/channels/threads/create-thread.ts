import { defineTool } from "@usemcpkit/core";

export const channelsThreadsCreateThread = defineTool({
  name: "channels:threads:create_thread",
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
      auto_archive_duration: {},
      rate_limit_per_user: {
        type: "integer",
      },
      applied_tags: {
        type: "array",
        items: {
          type: "string",
        },
      },
      message: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          embeds: {
            type: "array",
            items: {
              type: "object",
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
            },
          },
          flags: {
            type: "integer",
          },
          attachments: {
            type: "array",
            items: {
              type: "object",
            },
          },
          poll: {
            type: "object",
            properties: {
              question: {
                type: "object",
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
        },
      },
      type: {},
      invitable: {
        type: "boolean",
      },
    },
    required: ["channel_id", "name"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/threads",
    body: ["name", "auto_archive_duration", "rate_limit_per_user", "applied_tags", "message", "type", "invitable"],
  },
});
