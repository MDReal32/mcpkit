import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetSelfHostedRunnerGroupForOrg = defineTool({
  name: "actions:actions:get_self_hosted_runner_group_for_org",
  description:
    "Get a self-hosted runner group for an organization. Gets a specific self-hosted runner group for an organization.",
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
    },
    required: ["org", "runner_group_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/actions/runner-groups/{runner_group_id}",
  },
});
