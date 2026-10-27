import { defineTool } from "@usemcpkit/core";

export const guildsChannelsBulkUpdateGuildChannels = defineTool({
  name: "guilds:channels:bulk_update_guild_channels",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {},
            position: {
              type: "integer",
            },
            parent_id: {},
            lock_permissions: {
              type: "boolean",
            },
          },
        },
      },
    },
    required: ["guild_id", "body"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/channels",
    bodyArg: "body",
  },
});
