import { defineTool } from "@usemcpkit/core";

export const reposGitGetTag = defineTool({
  name: "repos:git:get_tag",
  description: "Get a tag. **Signature verification object**",
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
      tag_sha: {
        type: "string",
      },
    },
    required: ["owner", "repo", "tag_sha"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/git/tags/{tag_sha}",
  },
});
