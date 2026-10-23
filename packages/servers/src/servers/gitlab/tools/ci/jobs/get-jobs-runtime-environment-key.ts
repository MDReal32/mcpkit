import { defineTool } from "@usemcpkit/core";

export const ciJobsGetJobsRuntimeEnvironmentKey = defineTool({
  name: "ci:jobs:get_jobs_runtime_environment_key",
  description:
    "Get the runtime environment key for a job. Retrieves the runtime environment key linked to a job, if the job is resuming a suspended environment.",
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
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/jobs/{id}/runtime_environment_key",
    query: ["token"],
  },
});
