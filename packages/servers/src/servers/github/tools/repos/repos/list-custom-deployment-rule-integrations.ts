import { defineTool } from "@usemcpkit/core";

export const reposReposListCustomDeploymentRuleIntegrations = defineTool({
  name: "repos:repos:list_custom_deployment_rule_integrations",
  description:
    "List custom deployment rule integrations available for an environment. Gets all custom deployment protection rule integrations that are available for an environment.",
  input: {
    type: "object",
    properties: {
      environment_name: {
        type: "string",
        description:
          "The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["environment_name", "repo", "owner"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps",
    query: ["page", "per_page"],
  },
});
