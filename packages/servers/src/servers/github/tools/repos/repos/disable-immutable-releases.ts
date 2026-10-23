import { defineTool } from "@usemcpkit/core";

export const reposReposDisableImmutableReleases = defineTool({
  name: "repos:repos:disable_immutable_releases",
  description:
    "Disable immutable releases. Disables immutable releases for a repository. The authenticated user must have admin access to the repository.",
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
    path: "/repos/{owner}/{repo}/immutable-releases",
  },
});
