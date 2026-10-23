import { defineTool } from "@usemcpkit/core";

export const datacenterWebhooksGet = defineTool({
  name: "datacenter:webhooks:get",
  description:
    "[Data Center] Get webhook. Get a webhook by id. The authenticated user must be an administrator to call this resource.",
  input: {
    type: "object",
    properties: {
      webhookId: {
        type: "integer",
        description: "id of the webhook",
      },
      statistics: {
        type: "boolean",
      },
    },
    required: ["webhookId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/webhooks/{webhookId}",
    query: ["statistics"],
  },
});
