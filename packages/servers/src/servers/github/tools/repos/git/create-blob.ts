import { defineTool } from "@usemcpkit/core";

export const reposGitCreateBlob = defineTool({
  name: "repos:git:create_blob",
  description: "Create a blob",
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
      content: {
        type: "string",
        description: "The new blob's content.",
      },
      encoding: {
        type: "string",
        description: 'The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.',
        default: "utf-8",
      },
    },
    required: ["owner", "repo", "content"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/git/blobs",
    body: ["content", "encoding"],
  },
});
