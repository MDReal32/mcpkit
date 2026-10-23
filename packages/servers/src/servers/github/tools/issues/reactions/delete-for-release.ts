import { defineTool } from "@usemcpkit/core";

export const issuesReactionsDeleteForRelease = defineTool({
  name: "issues:reactions:delete_for_release",
  description:
    "Delete a release reaction. > [!NOTE] > You can also specify a repository by `repository_id` using the route `DELETE delete /repositories/:repository_id/releases/:release_id/reactions/:reaction_id`.",
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
      release_id: {
        type: "integer",
        description: "The unique identifier of the release.",
      },
      reaction_id: {
        type: "integer",
        description: "The unique identifier of the reaction.",
      },
    },
    required: ["owner", "repo", "release_id", "reaction_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}",
  },
});
