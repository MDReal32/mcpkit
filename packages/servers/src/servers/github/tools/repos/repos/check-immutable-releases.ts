import { defineTool } from "@usemcpkit/core";

export const reposReposCheckImmutableReleases = defineTool({
  name: "repos:repos:check_immutable_releases",
  description:
    "Check if immutable releases are enabled for a repository. Shows whether immutable releases are enabled or disabled. Also identifies whether immutability is being enforced by the repository owner. The authenticated user must have admin read access to the repository.",
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
    method: "GET",
    path: "/repos/{owner}/{repo}/immutable-releases",
  },
});
