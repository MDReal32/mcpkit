import { defineTool } from "@usemcpkit/core";

export const reposReposGetRepoRulesetVersion = defineTool({
  name: "repos:repos:get_repo_ruleset_version",
  description: "Get repository ruleset version. Get a version of a repository ruleset.",
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
      version_id: {
        type: "integer",
        description: "The ID of the version",
      },
    },
    required: ["owner", "repo", "ruleset_id", "version_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}",
  },
});
