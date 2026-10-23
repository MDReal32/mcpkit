import { defineTool } from "@usemcpkit/core";

export const datacenterWebhooksList = defineTool({
  name: "datacenter:webhooks:list",
  description:
    "[Data Center] Find webhooks. Find webhooks. The authenticated user must be an administrator to call this resource.",
  input: {
    type: "object",
    properties: {
      limit: {
        type: "integer",
        description: "the limit of the number of items to return, this may be restricted by fixed system limits.",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return",
      },
      event: {
        type: "string",
        description: "list of webhook event ids to filter for (comma-separated)",
      },
      statistics: {
        type: "boolean",
        description: "if statistics should be provided for all found webhooks.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/webhooks",
    query: ["limit", "start", "event", "statistics"],
  },
});
