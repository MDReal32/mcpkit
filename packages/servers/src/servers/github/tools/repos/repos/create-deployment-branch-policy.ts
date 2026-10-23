import { defineTool } from "@usemcpkit/core";

export const reposReposCreateDeploymentBranchPolicy = defineTool({
  name: "repos:repos:create_deployment_branch_policy",
  description: "Create a deployment branch policy. Creates a deployment branch or tag policy for an environment.",
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
      environment_name: {
        type: "string",
        description:
          "The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.",
      },
      name: {
        type: "string",
        description: "The name pattern that branches or tags must match in order to deploy to the environment.",
      },
      type: {
        type: "string",
        description: "Whether this rule targets a branch or tag",
        enum: ["branch", "tag"],
      },
    },
    required: ["owner", "repo", "environment_name", "name"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
    body: ["name", "type"],
  },
});
