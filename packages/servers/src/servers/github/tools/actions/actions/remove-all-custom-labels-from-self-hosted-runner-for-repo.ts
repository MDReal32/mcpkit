import { defineTool } from "@usemcpkit/core";

export const actionsActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo = defineTool({
  name: "actions:actions:remove_all_custom_labels_from_self_hosted_runner_for_repo",
  description:
    "Remove all custom labels from a self-hosted runner for a repository. Remove all custom labels from a self-hosted runner configured in a repository. Returns the remaining read-only labels from the runner.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      runner_id: {
        type: "integer",
        description: "Unique identifier of the self-hosted runner.",
      },
    },
    required: ["owner", "repo", "runner_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/actions/runners/{runner_id}/labels",
  },
});
