import { defineTool } from "@usemcpkit/core";

export const metaExperimentsListExperiments = defineTool({
  name: "meta:experiments:list_experiments",
  description:
    "List all experiments. Lists all experiments on the GitLab instance. Each experiment has an `enabled` status that indicates whether the experiment is enabled globally, or only in specific contexts.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/experiments",
  },
});
