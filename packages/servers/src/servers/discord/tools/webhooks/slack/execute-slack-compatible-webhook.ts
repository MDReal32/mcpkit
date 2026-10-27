import { defineTool } from "@usemcpkit/core";

export const webhooksSlackExecuteSlackCompatibleWebhook = defineTool({
  name: "webhooks:slack:execute_slack_compatible_webhook",
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
      text: {
        type: "string",
      },
      username: {
        type: "string",
      },
      icon_url: {
        type: "string",
      },
      attachments: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            title_link: {
              type: "string",
            },
            text: {
              type: "string",
            },
            color: {
              type: "string",
            },
            ts: {
              type: "integer",
            },
            pretext: {
              type: "string",
            },
            footer: {
              type: "string",
            },
            footer_icon: {
              type: "string",
            },
            author_name: {
              type: "string",
            },
            author_link: {
              type: "string",
            },
            author_icon: {
              type: "string",
            },
            image_url: {
              type: "string",
            },
            thumb_url: {
              type: "string",
            },
            fields: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
      },
    },
    required: ["webhook_id", "webhook_token"],
  },
  request: {
    method: "POST",
    path: "/webhooks/{webhook_id}/{webhook_token}/slack",
    query: ["wait", "thread_id"],
    body: ["text", "username", "icon_url", "attachments"],
  },
});
