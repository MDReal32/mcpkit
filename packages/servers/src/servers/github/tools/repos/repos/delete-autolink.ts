import { defineTool } from "@usemcpkit/core";

export const reposReposDeleteAutolink = defineTool({
  name: "repos:repos:delete_autolink",
  description:
    "Delete an autolink reference from a repository. This deletes a single autolink reference by ID that was configured for the given repository.",
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
      autolink_id: {
        type: "integer",
        description: "The unique identifier of the autolink.",
      },
    },
    required: ["owner", "repo", "autolink_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/autolinks/{autolink_id}",
  },
});
