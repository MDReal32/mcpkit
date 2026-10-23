import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetPrivateRepoForkPrWorkflowsSettingsRepository = defineTool({
  name: "actions:actions:set_private_repo_fork_pr_workflows_settings_repository",
  description:
    "Set private repo fork PR workflow settings for a repository. Sets the settings for whether workflows from fork pull requests can run on a private repository.",
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
      run_workflows_from_fork_pull_requests: {
        type: "boolean",
        description:
          "Whether workflows triggered by pull requests from forks are allowed to run on private repositories.",
      },
      send_write_tokens_to_workflows: {
        type: "boolean",
        description:
          "Whether GitHub Actions can create pull requests or submit approving pull request reviews from a workflow triggered by a fork pull request.",
      },
      send_secrets_and_variables: {
        type: "boolean",
        description:
          "Whether to make secrets and variables available to workflows triggered by pull requests from forks.",
      },
      require_approval_for_fork_pr_workflows: {
        type: "boolean",
        description:
          "Whether workflows triggered by pull requests from forks require approval from a repository administrator to run.",
      },
    },
    required: ["owner", "repo", "run_workflows_from_fork_pull_requests"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos",
    body: [
      "run_workflows_from_fork_pull_requests",
      "send_write_tokens_to_workflows",
      "send_secrets_and_variables",
      "require_approval_for_fork_pr_workflows",
    ],
  },
});
