import { defineTool } from "@usemcpkit/core";

export const ciJobsCreateJobsRequest = defineTool({
  name: "ci:jobs:create_jobs_request",
  description: "Request a job. Requests a job for a runner to execute.",
  input: {
    type: "object",
    properties: {
      token: {
        type: "string",
        description: "Runner's authentication token",
      },
      system_id: {
        type: "string",
        description: "Runner's system identifier",
      },
      last_update: {
        type: "string",
        description: "`last_update` token of the runner queue.",
      },
      info: {
        type: "object",
        description: "Runner's metadata",
        properties: {
          name: {
            type: "string",
            description: "Runner's name",
          },
          version: {
            type: "string",
            description: "Runner's version",
          },
          revision: {
            type: "string",
            description: "Runner's revision",
          },
          platform: {
            type: "string",
            description: "Runner's platform",
          },
          architecture: {
            type: "string",
            description: "Runner's architecture",
          },
          executor: {
            type: "string",
            description: "Runner's executor",
          },
          features: {
            type: "object",
            description: "Runner's features",
          },
          config: {
            type: "object",
            description: "Runner's config",
            properties: {
              gpus: {
                type: "string",
                description: "GPUs enabled",
              },
            },
          },
          labels: {
            type: "object",
            description: "Runner's labels",
          },
        },
      },
      session: {
        type: "object",
        description: "Session data of the runner.",
        properties: {
          url: {
            type: "string",
            description: "URL of the session.",
          },
          certificate: {
            type: "string",
            description: "Certificate of the session.",
          },
          authorization: {
            type: "string",
            description: "Authorization of the session.",
          },
        },
      },
    },
    required: ["token"],
  },
  request: {
    method: "POST",
    path: "/jobs/request",
    body: ["token", "system_id", "last_update", "info", "session"],
  },
});
