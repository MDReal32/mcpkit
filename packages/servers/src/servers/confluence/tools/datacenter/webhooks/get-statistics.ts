import { defineTool } from "@usemcpkit/core";

export const datacenterWebhooksGetStatistics = defineTool({
  name: "datacenter:webhooks:get_statistics",
  description:
    "[Data Center] Get statistic. Get the statistics for a specific webhook. The authenticated user must be an administrator to call this resource.",
  input: {
    type: "object",
    properties: {
      webhookId: {
        type: "integer",
        description: "id of the webhook",
      },
      event: {
        type: "string",
        description: "the string id of a specific event to retrieve the last invocation for.",
      },
    },
    required: ["webhookId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/webhooks/{webhookId}/statistics",
    query: ["event"],
  },
});
