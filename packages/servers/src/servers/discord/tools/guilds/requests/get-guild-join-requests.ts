import { defineTool } from "@usemcpkit/core";

export const guildsRequestsGetGuildJoinRequests = defineTool({
  name: "guilds:requests:get_guild_join_requests",
  description: ". List join requests for guild, optionally filtered by application status",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      status: {
        type: "string",
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
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/requests",
    query: ["status", "limit", "before", "after"],
  },
});
