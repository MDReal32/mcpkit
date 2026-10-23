import { defineTool } from "@usemcpkit/core";

export const reposGitDeleteRef = defineTool({
  name: "repos:git:delete_ref",
  description: "Delete a reference. Deletes the provided reference.",
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
      ref: {
        type: "string",
        description: 'The Git reference. For more information, see "Git References" in the Git documentation.',
      },
    },
    required: ["owner", "repo", "ref"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/git/refs/{ref}",
  },
});
