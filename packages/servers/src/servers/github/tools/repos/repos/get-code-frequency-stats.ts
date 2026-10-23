import { defineTool } from "@usemcpkit/core";

export const reposReposGetCodeFrequencyStats = defineTool({
  name: "repos:repos:get_code_frequency_stats",
  description:
    "Get the weekly commit activity. Returns a weekly aggregate of the number of additions and deletions pushed to a repository.",
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
    path: "/repos/{owner}/{repo}/stats/code_frequency",
  },
});
