import { defineTool } from "@usemcpkit/core";

export const reposReposDeleteInvitation = defineTool({
  name: "repos:repos:delete_invitation",
  description: "Delete a repository invitation",
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
      invitation_id: {
        type: "integer",
        description: "The unique identifier of the invitation.",
      },
    },
    required: ["owner", "repo", "invitation_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/invitations/{invitation_id}",
  },
});
