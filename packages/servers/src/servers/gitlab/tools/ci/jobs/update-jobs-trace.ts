import { defineTool } from "@usemcpkit/core";

export const ciJobsUpdateJobsTrace = defineTool({
  name: "ci:jobs:update_jobs_trace",
  description:
    "Update the trace of a job. Updates the trace of a job by appending a chunk of log output. Used by runners while executing a job.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the job.",
      },
      token: {
        type: "string",
        description: "Authentication token of the job.",
      },
      debug_trace: {
        type: "boolean",
        description: "If `true`, enables debug tracing for the job.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PATCH",
    path: "/jobs/{id}/trace",
    body: ["token", "debug_trace"],
  },
});
