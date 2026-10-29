import { defineTool } from "@usemcpkit/core";

export const guildsAutoModerationUpdateAutoModerationRule = defineTool({
  name: "guilds:auto_moderation:update_auto_moderation_rule",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      rule_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      event_type: {
        type: "integer",
      },
      actions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: {
              type: "integer",
              enum: [3],
            },
            metadata: {
              type: "object",
            },
          },
          required: ["type"],
        },
      },
      enabled: {
        type: "boolean",
      },
      exempt_roles: {
        type: "array",
        items: {
          type: "string",
        },
      },
      exempt_channels: {
        type: "array",
        items: {
          type: "string",
        },
      },
      trigger_type: {
        type: "integer",
        enum: [6],
      },
      trigger_metadata: {
        type: "object",
        properties: {
          keyword_filter: {
            type: "array",
            items: {
              type: "string",
            },
          },
          regex_patterns: {
            type: "array",
            items: {
              type: "string",
            },
          },
          allow_list: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["guild_id", "rule_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
    body: [
      "name",
      "event_type",
      "actions",
      "enabled",
      "exempt_roles",
      "exempt_channels",
      "trigger_type",
      "trigger_metadata",
    ],
  },
});
