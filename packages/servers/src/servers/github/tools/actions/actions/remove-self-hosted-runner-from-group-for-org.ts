import { defineTool } from "@usemcpkit/core";

export const actionsActionsRemoveSelfHostedRunnerFromGroupForOrg = defineTool({
  name: "actions:actions:remove_self_hosted_runner_from_group_for_org",
  description:
    "Remove a self-hosted runner from a group for an organization. Removes a self-hosted runner from a group configured in an organization. The runner is then returned to the default group.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      runner_group_id: {
        type: "integer",
        description: "Unique identifier of the self-hosted runner group.",
      },
      runner_id: {
        type: "integer",
        description: "Unique identifier of the self-hosted runner.",
      },
    },
    required: ["org", "runner_group_id", "runner_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}",
  },
});
