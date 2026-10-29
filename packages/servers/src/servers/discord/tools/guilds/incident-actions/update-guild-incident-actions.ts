import { defineTool } from "@usemcpkit/core";

export const guildsIncidentActionsUpdateGuildIncidentActions = defineTool({
  name: "guilds:incident_actions:update_guild_incident_actions",
  description: ". Modifies the incident actions of the guild",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      invites_disabled_until: {
        type: "string",
        description: "When invites will be enabled again",
      },
      dms_disabled_until: {
        type: "string",
        description: "When direct messages will be enabled again",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "PUT",
    path: "/guilds/{guild_id}/incident-actions",
    body: ["invites_disabled_until", "dms_disabled_until"],
  },
});
