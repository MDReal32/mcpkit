import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetPrivateRepoForkPrWorkflowsSettingsRepository = defineTool({
  name: "actions:actions:get_private_repo_fork_pr_workflows_settings_repository",
  description:
    "Get private repo fork PR workflow settings for a repository. Gets the settings for whether workflows from fork pull requests can run on a private repository.",
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
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos",
  },
});
