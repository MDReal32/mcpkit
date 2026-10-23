import { defineTool } from "@usemcpkit/core";

export const reposReposRemoveCollaborator = defineTool({
  name: "repos:repos:remove_collaborator",
  description: "Remove a repository collaborator. Removes a collaborator from a repository.",
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
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
    },
    required: ["owner", "repo", "username"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/collaborators/{username}",
  },
});
