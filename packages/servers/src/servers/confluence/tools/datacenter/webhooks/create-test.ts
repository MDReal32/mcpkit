import { defineTool } from "@usemcpkit/core";

export const datacenterWebhooksCreateTest = defineTool({
  name: "datacenter:webhooks:create_test",
  description:
    "[Data Center] Test webhook. Test connectivity to a specific endpoint. The authenticated user must be an administrator to call this resource.",
  input: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "the url in which to connect to",
      },
    },
    required: ["url"],
  },
  request: {
    method: "POST",
    path: "/rest/api/webhooks/test",
    query: ["url"],
  },
});
