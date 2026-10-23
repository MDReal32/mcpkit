import { defineTool } from "@usemcpkit/core";

export const ciRunnersListRunnerControllersTokens = defineTool({
  name: "ci:runners:list_runner_controllers_tokens",
  description: "List all runner controller tokens. Lists all runner controller tokens.",
  input: {
    type: "object",
    properties: {
      runner_controller_id: {
        type: "integer",
        description: "ID of the runner controller.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["runner_controller_id"],
  },
  request: {
    method: "GET",
    path: "/runner_controllers/{runner_controller_id}/tokens",
    query: ["page", "per_page"],
  },
});
