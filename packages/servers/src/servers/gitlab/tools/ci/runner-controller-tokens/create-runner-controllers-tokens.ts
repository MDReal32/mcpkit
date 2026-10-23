import { defineTool } from "@usemcpkit/core";

export const ciRunnerControllerTokensCreateRunnerControllersTokens = defineTool({
  name: "ci:runner_controller_tokens:create_runner_controllers_tokens",
  description: "Create a runner controller token. Creates a runner controller token.",
  input: {
    type: "object",
    properties: {
      runner_controller_id: {
        type: "integer",
        description: "ID of the runner controller.",
      },
      description: {
        type: "string",
        description: "Description of the runner controller token.",
      },
    },
    required: ["runner_controller_id"],
  },
  request: {
    method: "POST",
    path: "/runner_controllers/{runner_controller_id}/tokens",
    body: ["description"],
  },
});
