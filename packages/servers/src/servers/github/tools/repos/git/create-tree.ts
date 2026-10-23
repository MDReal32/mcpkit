import { defineTool } from "@usemcpkit/core";

export const reposGitCreateTree = defineTool({
  name: "repos:git:create_tree",
  description:
    "Create a tree. The tree creation API accepts nested entries. If you specify both a tree and a nested path modifying that tree, this endpoint will overwrite the contents of the tree with the new path contents, and create a new tree structure.",
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
      tree: {
        type: "array",
        description: "Objects (of `path`, `mode`, `type`, and `sha`) specifying a tree structure.",
        items: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "The file referenced in the tree.",
            },
            mode: {
              type: "string",
              description:
                "The file mode; one of `100644` for file (blob), `100755` for executable (blob), `040000` for subdirectory (tree), `160000` for submodule (commit), or `120000` for a blob that specifies the path of a symlink.",
              enum: ["100644", "100755", "040000", "160000", "120000"],
            },
            type: {
              type: "string",
              description: "Either `blob`, `tree`, or `commit`.",
              enum: ["blob", "tree", "commit"],
            },
            sha: {
              type: "string",
              description:
                "The SHA1 checksum ID of the object in the tree. Also called `tree.sha`. If the value is `null` then the file will be deleted.",
            },
            content: {
              type: "string",
              description:
                "The content you want this file to have. GitHub will write this blob out and use that SHA for this entry. Use either this, or `tree.sha`.",
            },
          },
        },
      },
      base_tree: {
        type: "string",
        description:
          "The SHA1 of an existing Git tree object which will be used as the base for the new tree. If provided, a new Git tree object will be created from entries in the Git tree object pointed to by `base_tree` and entries defined in the `tree` parameter. Entries defined in the `tree` parameter will overwrite items from `base_tree` with the same `path`. If you're creating new changes on a branch, then nor…",
      },
    },
    required: ["owner", "repo", "tree"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/git/trees",
    body: ["tree", "base_tree"],
  },
});
