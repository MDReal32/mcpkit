import { defineTool } from "@usemcpkit/core";

export const reposReposRenameBranch = defineTool({
  name: "repos:repos:rename_branch",
  description: "Rename a branch. Renames a branch in a repository.",
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
      branch: {
        type: "string",
        description:
          "The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the GraphQL API.",
      },
      new_name: {
        type: "string",
        description: "The new name of the branch.",
      },
    },
    required: ["owner", "repo", "branch", "new_name"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/branches/{branch}/rename",
    body: ["new_name"],
  },
});
