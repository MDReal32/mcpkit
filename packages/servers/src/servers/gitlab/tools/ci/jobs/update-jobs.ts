import { defineTool } from "@usemcpkit/core";

export const ciJobsUpdateJobs = defineTool({
  name: "ci:jobs:update_jobs",
  description: "Update a job. Updates the state and other attributes of a job. Used by runners while executing a job.",
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
      state: {
        type: "string",
        description: "Status of the job: `running`, `success`, or `failed`.",
      },
      checksum: {
        type: "string",
        description: "CRC32 checksum of the job trace.",
      },
      failure_reason: {
        type: "string",
        description: "Failure reason of the job.",
      },
      output: {
        type: "object",
        description: "Build log state.",
        properties: {
          checksum: {
            type: "string",
            description: "CRC32 checksum of the job trace.",
          },
          bytesize: {
            type: "integer",
            description: "Size of the job's trace output, in bytes.",
          },
        },
      },
      exit_code: {
        type: "integer",
        description: "Exit code of the job.",
      },
      runtime_environment_key: {
        type: "string",
        description: "Runtime environment key emitted by the runner on job suspension",
      },
    },
    required: ["id", "token"],
  },
  request: {
    method: "PUT",
    path: "/jobs/{id}",
    body: ["token", "state", "checksum", "failure_reason", "output", "exit_code", "runtime_environment_key"],
  },
});
