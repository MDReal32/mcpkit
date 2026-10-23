import { defineTool } from "@usemcpkit/core";

export const adminSidekiqGetSidekiqJobStats = defineTool({
  name: "admin:sidekiq:get_sidekiq_job_stats",
  description: "Retrieve job completion metrics. Retrieves statistics on the completion status of all Sidekiq jobs.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/sidekiq/job_stats",
  },
});
