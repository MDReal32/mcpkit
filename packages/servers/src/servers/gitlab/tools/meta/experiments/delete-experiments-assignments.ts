import { defineTool } from "@usemcpkit/core";

export const metaExperimentsDeleteExperimentsAssignments = defineTool({
  name: "meta:experiments:delete_experiments_assignments",
  description:
    "Clear a variant assignment for an experiment context. Removes the cached variant assignment for the given experiment and context, returning the actor to normal rollout assignment. Defaults to current user if no context is provided.",
  input: {
    type: "object",
    properties: {
      experiment_name: {
        type: "string",
        description: "The experiment name",
      },
      context: {
        type: "object",
        description:
          "Context parameters (user, namespace, project). An actor context is resolved from the user. Defaults to current user.",
      },
    },
    required: ["experiment_name"],
  },
  request: {
    method: "DELETE",
    path: "/experiments/{experiment_name}/assignments",
    query: ["context"],
  },
});
