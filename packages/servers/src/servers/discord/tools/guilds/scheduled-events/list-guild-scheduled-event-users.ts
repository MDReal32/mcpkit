import { defineTool } from "@usemcpkit/core";

export const guildsScheduledEventsListGuildScheduledEventUsers = defineTool({
  name: "guilds:scheduled_events:list_guild_scheduled_event_users",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      guild_scheduled_event_id: {
        type: "string",
      },
      with_member: {
        type: "boolean",
      },
      limit: {
        type: "integer",
      },
      before: {
        type: "string",
      },
      after: {
        type: "string",
      },
    },
    required: ["guild_id", "guild_scheduled_event_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users",
    query: ["with_member", "limit", "before", "after"],
  },
});
