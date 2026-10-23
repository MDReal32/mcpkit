import { defineTool } from "@usemcpkit/core";

export const ciRunnerControllersCreateRunnerControllersScopesInstance = defineTool({
  name: "ci:runner_controllers:create_runner_controllers_scopes_instance",
  description:
    "Add instance scope. Adds an instance scope to a runner controller. When added, the runner controller evaluates jobs for all runners in the GitLab instance. A runner controller can have only one instance scope. If an instance scope already exists, this operation returns an error.",
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
    method: "POST",
    path: "/runner_controllers/{id}/scopes/instance",
  },
});
