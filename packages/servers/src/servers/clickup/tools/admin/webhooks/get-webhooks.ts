import { defineTool } from "@usemcpkit/core";

export const adminWebhooksGetWebhooks = defineTool({
  name: "admin:webhooks:get_webhooks",
  description:
    "Get Webhooks. View the webhooks created via the API for a Workspace. This endpoint returns webhooks created by the authenticated user.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/webhook",
  },
});
