import { defineTool } from "@usemcpkit/core";

export const reposReposListDeploymentBranchPolicies = defineTool({
  name: "repos:repos:list_deployment_branch_policies",
  description: "List deployment branch policies. Lists the deployment branch policies for an environment.",
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
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["owner", "repo", "environment_name"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
    query: ["per_page", "page"],
  },
});
