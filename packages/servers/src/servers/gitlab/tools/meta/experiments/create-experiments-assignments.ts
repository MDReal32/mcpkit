import { defineTool } from "@usemcpkit/core";

export const metaExperimentsCreateExperimentsAssignments = defineTool({
  name: "meta:experiments:create_experiments_assignments",
  description:
    "Force a variant assignment for an experiment context. Forces a specific variant assignment for the given experiment and context. The assignment is stored in Redis cache and will persist until overwritten. Defaults to current user if no context is provided.",
  input: {
    type: "object",
    properties: {
      experiment_name: {
        type: "string",
        description: "The experiment name",
      },
      variant: {
        type: "string",
        description: "Variant name to assign, for example `control` or `candidate`.",
      },
      context: {
        type: "object",
        description:
          "Context parameters (user, namespace, project). An actor context is resolved from the user. Defaults to current user.",
      },
    },
    required: ["experiment_name", "variant"],
  },
  request: {
    method: "POST",
    path: "/experiments/{experiment_name}/assignments",
    body: ["variant", "context"],
  },
});
