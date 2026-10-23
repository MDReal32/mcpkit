import { defineTool } from "@usemcpkit/core";

export const actionsActionsDeleteSelfHostedRunnerFromRepo = defineTool({
  name: "actions:actions:delete_self_hosted_runner_from_repo",
  description:
    "Delete a self-hosted runner from a repository. Forces the removal of a self-hosted runner from a repository. You can use this endpoint to completely remove the runner when the machine you were using no longer exists.",
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
    path: "/repos/{owner}/{repo}/actions/runners/{runner_id}",
  },
});
