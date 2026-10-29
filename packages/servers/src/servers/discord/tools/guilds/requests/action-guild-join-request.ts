import { defineTool } from "@usemcpkit/core";

export const guildsRequestsActionGuildJoinRequest = defineTool({
  name: "guilds:requests:action_guild_join_request",
  description: ". Approve or reject guild join request",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      request_id: {
        type: "string",
      },
      action: {
        type: "string",
        description: "Whether to approve or reject the join request",
      },
      rejection_reason: {
        type: "string",
        description: "Reason for rejection. Only used when action is REJECTED",
      },
    },
    required: ["guild_id", "request_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/requests/{request_id}",
    body: ["action", "rejection_reason"],
  },
});
