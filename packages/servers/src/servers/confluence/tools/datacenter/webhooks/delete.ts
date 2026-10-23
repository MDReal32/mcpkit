import { defineTool } from "@usemcpkit/core";

export const datacenterWebhooksDelete = defineTool({
  name: "datacenter:webhooks:delete",
  description:
    "[Data Center] Delete webhook. Delete a webhook via the URL. The authenticated user must be an administrator to call this resource.",
  input: {
    type: "object",
    properties: {
      webhookId: {
        type: "integer",
        description: "the id of the webhook to be deleted.",
      },
    },
    required: ["webhookId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/webhooks/{webhookId}",
  },
});
