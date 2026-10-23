import { defineTool } from "@usemcpkit/core";

export const reposGitGetRef = defineTool({
  name: "repos:git:get_ref",
  description:
    "Get a reference. Returns a single reference from your Git database. The `:ref` in the URL must be formatted as `heads/<branch name>` for branches and `tags/<tag name>` for tags. If the `:ref` doesn't match an existing ref, a `404` is returned.",
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
        description: 'The Git reference. For more information, see "Git References" in the Git documentation.',
      },
    },
    required: ["owner", "repo", "ref"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/git/ref/{ref}",
  },
});
