import { defineTool } from "@usemcpkit/core";

export const reposReposGetRelease = defineTool({
  name: "repos:repos:get_release",
  description: "Get a release. Gets a public release with the specified release ID.",
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
    },
    required: ["owner", "repo", "release_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/releases/{release_id}",
  },
});
