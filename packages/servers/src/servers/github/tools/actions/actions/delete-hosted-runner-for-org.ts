import { defineTool } from "@usemcpkit/core";

export const actionsActionsDeleteHostedRunnerForOrg = defineTool({
  name: "actions:actions:delete_hosted_runner_for_org",
  description: "Delete a GitHub-hosted runner for an organization. Deletes a GitHub-hosted runner for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      hosted_runner_id: {
        type: "integer",
        description: "Unique identifier of the GitHub-hosted runner.",
      },
    },
    required: ["org", "hosted_runner_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/actions/hosted-runners/{hosted_runner_id}",
  },
});
