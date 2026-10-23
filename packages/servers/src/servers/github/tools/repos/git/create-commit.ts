import { defineTool } from "@usemcpkit/core";

export const reposGitCreateCommit = defineTool({
  name: "repos:git:create_commit",
  description: "Create a commit. Creates a new Git commit object.",
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
      message: {
        type: "string",
        description: "The commit message",
      },
      tree: {
        type: "string",
        description: "The SHA of the tree object this commit points to",
      },
      parents: {
        type: "array",
        description:
          "The full SHAs of the commits that were the parents of this commit. If omitted or empty, the commit will be written as a root commit. For a single parent, an array of one SHA should be provided; for a merge commit, an array of more than one should be provided.",
        items: {
          type: "string",
        },
      },
      author: {
        type: "object",
        description:
          "Information about the author of the commit. By default, the `author` will be the authenticated user and the current date. See the `author` and `committer` object below for details.",
        properties: {
          name: {
            type: "string",
            description: "The name of the author (or committer) of the commit",
          },
          email: {
            type: "string",
            description: "The email of the author (or committer) of the commit",
          },
          date: {
            type: "string",
            description:
              "Indicates when this commit was authored (or committed). This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
          },
        },
        required: ["name", "email"],
      },
      committer: {
        type: "object",
        description:
          "Information about the person who is making the commit. By default, `committer` will use the information set in `author`. See the `author` and `committer` object below for details.",
        properties: {
          name: {
            type: "string",
            description: "The name of the author (or committer) of the commit",
          },
          email: {
            type: "string",
            description: "The email of the author (or committer) of the commit",
          },
          date: {
            type: "string",
            description:
              "Indicates when this commit was authored (or committed). This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
          },
        },
      },
      signature: {
        type: "string",
        description:
          "The PGP signature of the commit. GitHub adds the signature to the `gpgsig` header of the created commit. For a commit signature to be verifiable by Git or GitHub, it must be an ASCII-armored detached PGP signature over the string commit as it would be written to the object database. To pass a `signature` parameter, you need to first manually create a valid PGP signature, which can be complicated.…",
      },
    },
    required: ["owner", "repo", "message", "tree"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/git/commits",
    body: ["message", "tree", "parents", "author", "committer", "signature"],
  },
});
