import { defineTool } from "@usemcpkit/core";

export const reposReposCodeownersErrors = defineTool({
  name: "repos:repos:codeowners_errors",
  description: "List CODEOWNERS errors. List any syntax errors that are detected in the CODEOWNERS file.",
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
      ref: {
        type: "string",
        description:
          "A branch, tag or commit name used to determine which version of the CODEOWNERS file to use. Default: the repository's default branch (e.g. `main`)",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/codeowners/errors",
    query: ["ref"],
  },
});
