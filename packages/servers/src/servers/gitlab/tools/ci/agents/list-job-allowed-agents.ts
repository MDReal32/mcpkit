import { defineTool } from "@usemcpkit/core";

export const ciAgentsListJobAllowedAgents = defineTool({
  name: "ci:agents:list_job_allowed_agents",
  description:
    "List all GitLab agents for Kubernetes by job token. Lists all GitLab agents for Kubernetes with a specified `CI_JOB_TOKEN`.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/job/allowed_agents",
  },
});
