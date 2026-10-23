import { defineTool } from "@usemcpkit/core";

export const reposReposListBranchesForHeadCommit = defineTool({
  name: "repos:repos:list_branches_for_head_commit",
  description:
    "List branches for HEAD commit. Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see GitHub's products in the GitHub Help documentation.",
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
      commit_sha: {
        type: "string",
        description: "The SHA of the commit.",
      },
    },
    required: ["owner", "repo", "commit_sha"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head",
  },
});
