import { defineTool } from "@usemcpkit/core";

export const reposReposGetContent = defineTool({
  name: "repos:repos:get_content",
  description:
    "Get repository content. Gets the contents of a file or directory in a repository. Specify the file path or directory with the `path` parameter. If you omit the `path` parameter, you will receive the contents of the repository's root directory.",
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
      path: {
        type: "string",
        description: "path parameter",
      },
      ref: {
        type: "string",
        description: "The name of the commit/branch/tag. Default: the repository’s default branch.",
      },
    },
    required: ["owner", "repo", "path"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/contents/{path}",
    query: ["ref"],
  },
});
