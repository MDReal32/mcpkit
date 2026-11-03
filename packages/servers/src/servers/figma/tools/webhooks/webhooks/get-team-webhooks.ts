import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksGetTeamWebhooks = defineTool({
  name: "webhooks:webhooks:get_team_webhooks",
  description: "[Deprecated] [Deprecated] Get team webhooks. Returns all webhooks registered under the specified team.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "string",
        description: "ID of team to get webhooks for",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/teams/{team_id}/webhooks",
  },
});
