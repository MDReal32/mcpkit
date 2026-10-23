import { defineTool } from "@usemcpkit/core";

export const reposReposGetContributorsStats = defineTool({
  name: "repos:repos:get_contributors_stats",
  description:
    "Get all contributor commit activity. Returns the `total` number of commits authored by the contributor. In addition, the response includes a Weekly Hash (`weeks` array) with the following information:",
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
    path: "/repos/{owner}/{repo}/stats/contributors",
  },
});
