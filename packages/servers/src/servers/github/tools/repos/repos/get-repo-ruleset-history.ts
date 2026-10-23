import { defineTool } from "@usemcpkit/core";

export const reposReposGetRepoRulesetHistory = defineTool({
  name: "repos:repos:get_repo_ruleset_history",
  description: "Get repository ruleset history. Get the history of a repository ruleset.",
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
      ruleset_id: {
        type: "integer",
        description: "The ID of the ruleset.",
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
    required: ["owner", "repo", "ruleset_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/rulesets/{ruleset_id}/history",
    query: ["per_page", "page"],
  },
});
