import { defineTool } from "@usemcpkit/core";

export const usersActivityUnstarRepoForAuthenticatedUser = defineTool({
  name: "users:activity:unstar_repo_for_authenticated_user",
  description:
    "Unstar a repository for the authenticated user. Unstar a repository that the authenticated user has previously starred.",
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
    path: "/user/starred/{owner}/{repo}",
  },
});
