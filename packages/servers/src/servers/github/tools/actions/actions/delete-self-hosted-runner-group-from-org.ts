import { defineTool } from "@usemcpkit/core";

export const actionsActionsDeleteSelfHostedRunnerGroupFromOrg = defineTool({
  name: "actions:actions:delete_self_hosted_runner_group_from_org",
  description:
    "Delete a self-hosted runner group from an organization. Deletes a self-hosted runner group for an organization.",
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
    method: "DELETE",
    path: "/orgs/{org}/actions/runner-groups/{runner_group_id}",
  },
});
