import { defineTool } from "@usemcpkit/core";

export const orgsInteractionsGetPullRequestCreationCapForRepo = defineTool({
  name: "orgs:interactions:get_pull_request_creation_cap_for_repo",
  description:
    "Get pull request creation cap for a repository. Gets the pull request creation cap configuration for a repository. The cap limits the number of open pull requests a user can have at one time.",
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
    path: "/repos/{owner}/{repo}/interaction-limits/pulls/creation-cap",
  },
});
