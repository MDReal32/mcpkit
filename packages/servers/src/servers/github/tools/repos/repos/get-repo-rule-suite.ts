import { defineTool } from "@usemcpkit/core";

export const reposReposGetRepoRuleSuite = defineTool({
  name: "repos:repos:get_repo_rule_suite",
  description:
    'Get a repository rule suite. Gets information about a suite of rule evaluations from within a repository. For more information, see "Managing rulesets for a repository."',
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
      rule_suite_id: {
        type: "integer",
        description:
          "The unique identifier of the rule suite result. To get this ID, you can use GET /repos/{owner}/{repo}/rulesets/rule-suites for repositories and GET /orgs/{org}/rulesets/rule-suites for organizations.",
      },
      include_metadata: {
        type: "boolean",
        default: false,
        description:
          "When set to `true`, the response will include additional metadata for pull request and required status check rule evaluation. Results are capped at 50 entries.",
      },
    },
    required: ["owner", "repo", "rule_suite_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}",
    query: ["include_metadata"],
  },
});
