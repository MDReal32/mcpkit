import { defineTool } from "@usemcpkit/core";

export const usersActivityGetStargazerCountForRepo = defineTool({
  name: "users:activity:get_stargazer_count_for_repo",
  description:
    "Get stargazer count. Gets the current number of users who have starred the repository. Users who previously starred the repository but later removed their star are not included.",
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
    path: "/repos/{owner}/{repo}/stargazers/count",
  },
});
