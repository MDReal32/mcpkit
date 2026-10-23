import { defineTool } from "@usemcpkit/core";

export const ciRunnerControllersListRunnerControllersScopes = defineTool({
  name: "ci:runner_controllers:list_runner_controllers_scopes",
  description: "List all scopes for a runner controller. Lists all scopes for a runner controller.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the runner controller.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/runner_controllers/{id}/scopes",
  },
});
