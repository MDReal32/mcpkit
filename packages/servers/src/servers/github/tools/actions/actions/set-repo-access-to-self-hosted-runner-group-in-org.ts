import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetRepoAccessToSelfHostedRunnerGroupInOrg = defineTool({
  name: "actions:actions:set_repo_access_to_self_hosted_runner_group_in_org",
  description:
    "Set repository access for a self-hosted runner group in an organization. Replaces the list of repositories that have access to a self-hosted runner group configured in an organization.",
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
      selected_repository_ids: {
        type: "array",
        description: "List of repository IDs that can access the runner group.",
        items: {
          type: "integer",
          description: "Unique identifier of the repository.",
        },
      },
    },
    required: ["org", "runner_group_id", "selected_repository_ids"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories",
    body: ["selected_repository_ids"],
  },
});
