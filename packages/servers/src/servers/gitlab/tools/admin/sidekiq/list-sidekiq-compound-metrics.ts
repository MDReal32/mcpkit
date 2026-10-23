import { defineTool } from "@usemcpkit/core";

export const adminSidekiqListSidekiqCompoundMetrics = defineTool({
  name: "admin:sidekiq:list_sidekiq_compound_metrics",
  description:
    "List all Sidekiq metrics. Lists all Sidekiq metrics. Includes queue, process, and job completion metrics.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/sidekiq/compound_metrics",
  },
});
