import { defineTool } from "@usemcpkit/core";

export const reposReposDelete = defineTool({
  name: "repos:repos:delete",
  description: "Delete a repository. Deleting a repository requires admin access.",
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
    method: "DELETE",
    path: "/repos/{owner}/{repo}",
  },
});
