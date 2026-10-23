import { defineTool } from "@usemcpkit/core";

export const reposReposGetRepoRulesets = defineTool({
  name: "repos:repos:get_repo_rulesets",
  description: "Get all repository rulesets. Get all the rulesets for a repository.",
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
      includes_parents: {
        type: "boolean",
        default: true,
        description: "Include rulesets configured at higher levels that apply to this repository",
      },
      targets: {
        type: "string",
        description:
          "A comma-separated list of rule targets to filter by. If provided, only rulesets that apply to the specified targets will be returned. For example, `branch,tag,push`.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/rulesets",
    query: ["per_page", "page", "includes_parents", "targets"],
  },
});
