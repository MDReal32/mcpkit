import { defineTool } from "@usemcpkit/core";

export const applicationsInteractionsCreateInteractionResponse = defineTool({
  name: "applications:interactions:create_interaction_response",
  description: "",
  input: {
    type: "object",
    properties: {
      interaction_id: {
        type: "string",
      },
      interaction_token: {
        type: "string",
      },
      with_response: {
        type: "boolean",
      },
      type: {
        type: "integer",
        enum: [6, 7],
      },
      data: {
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
          components: {
            type: "array",
            items: {
              type: "object",
            },
          },
          attachments: {
            type: "array",
            items: {
              type: "object",
            },
          },
          flags: {
            type: "integer",
          },
        },
      },
    },
    required: ["interaction_id", "interaction_token", "type"],
  },
  request: {
    method: "POST",
    path: "/interactions/{interaction_id}/{interaction_token}/callback",
    query: ["with_response"],
    body: ["type", "data"],
  },
});
