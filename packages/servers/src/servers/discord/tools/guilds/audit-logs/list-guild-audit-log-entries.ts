import { defineTool } from "@usemcpkit/core";

export const guildsAuditLogsListGuildAuditLogEntries = defineTool({
  name: "guilds:audit_logs:list_guild_audit_log_entries",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
      target_id: {
        type: "string",
      },
      action_type: {
        type: "integer",
      },
      before: {
        type: "string",
      },
      after: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/audit-logs",
    query: ["user_id", "target_id", "action_type", "before", "after", "limit"],
  },
});
