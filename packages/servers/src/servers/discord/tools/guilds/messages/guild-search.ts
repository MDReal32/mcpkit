import { defineTool } from "@usemcpkit/core";

export const guildsMessagesGuildSearch = defineTool({
  name: "guilds:messages:guild_search",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      sort_by: {
        type: "string",
      },
      sort_order: {
        type: "string",
      },
      content: {
        type: "string",
      },
      slop: {
        type: "integer",
      },
      author_id: {
        type: "array",
        items: {
          type: "string",
        },
      },
      author_type: {
        type: "array",
        items: {
          type: "string",
        },
      },
      mentions: {
        type: "array",
        items: {
          type: "string",
        },
      },
      mentions_role_id: {
        type: "array",
        items: {
          type: "string",
        },
      },
      replied_to_user_id: {
        type: "array",
        items: {
          type: "string",
        },
      },
      replied_to_message_id: {
        type: "array",
        items: {
          type: "string",
        },
      },
      mention_everyone: {
        type: "boolean",
      },
      min_id: {
        type: "string",
      },
      max_id: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      offset: {
        type: "integer",
      },
      has: {
        type: "array",
        items: {
          type: "string",
        },
      },
      link_hostname: {
        type: "array",
        items: {
          type: "string",
        },
      },
      embed_provider: {
        type: "array",
        items: {
          type: "string",
        },
      },
      embed_type: {
        type: "array",
        items: {
          type: "string",
        },
      },
      attachment_extension: {
        type: "array",
        items: {
          type: "string",
        },
      },
      attachment_filename: {
        type: "array",
        items: {
          type: "string",
        },
      },
      pinned: {
        type: "boolean",
      },
      include_nsfw: {
        type: "boolean",
      },
      channel_id: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/messages/search",
    query: [
      "sort_by",
      "sort_order",
      "content",
      "slop",
      "author_id",
      "author_type",
      "mentions",
      "mentions_role_id",
      "replied_to_user_id",
      "replied_to_message_id",
      "mention_everyone",
      "min_id",
      "max_id",
      "limit",
      "offset",
      "has",
      "link_hostname",
      "embed_provider",
      "embed_type",
      "attachment_extension",
      "attachment_filename",
      "pinned",
      "include_nsfw",
      "channel_id",
    ],
  },
});
