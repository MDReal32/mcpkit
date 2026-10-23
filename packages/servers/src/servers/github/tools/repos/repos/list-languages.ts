import { defineTool } from "@usemcpkit/core";

export const reposReposListLanguages = defineTool({
  name: "repos:repos:list_languages",
  description:
    "List repository languages. Lists languages for the specified repository. The value shown for each language is the number of bytes of code written in that language.",
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
    path: "/repos/{owner}/{repo}/languages",
  },
});
