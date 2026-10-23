import { defineTool } from "@usemcpkit/core";

export const reposGitGetTree = defineTool({
  name: "repos:git:get_tree",
  description: "Get a tree. Returns a single tree using the SHA1 value or ref name for that tree.",
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
      tree_sha: {
        type: "string",
        description: "The SHA1 value or ref (branch or tag) name of the tree.",
      },
      recursive: {
        type: "string",
        description:
          'Setting this parameter to any value returns the objects or subtrees referenced by the tree specified in `:tree_sha`. For example, setting `recursive` to any of the following will enable returning objects or subtrees: `0`, `1`, `"true"`, and `"false"`. Omit this parameter to prevent recursively returning objects or subtrees.',
      },
    },
    required: ["owner", "repo", "tree_sha"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/git/trees/{tree_sha}",
    query: ["recursive"],
  },
});
