import { defineTool } from "@usemcpkit/core";

export const reposReposCreateCommitStatus = defineTool({
  name: "repos:repos:create_commit_status",
  description:
    "Create a commit status. Users with push access in a repository can create commit statuses for a given SHA.",
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
      sha: {
        type: "string",
      },
      state: {
        type: "string",
        description: "The state of the status.",
        enum: ["error", "failure", "pending", "success"],
      },
      target_url: {
        type: "string",
        description:
          "The target URL to associate with this status. This URL will be linked from the GitHub UI to allow users to easily see the source of the status. For example, if your continuous integration system is posting build status, you would want to provide the deep link for the build output for this specific SHA: `http://ci.example.com/user/repo/build/sha`",
      },
      description: {
        type: "string",
        description: "A short description of the status.",
      },
      context: {
        type: "string",
        description:
          "A string label to differentiate this status from the status of other systems. This field is case-insensitive.",
        default: "default",
      },
    },
    required: ["owner", "repo", "sha", "state"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/statuses/{sha}",
    body: ["state", "target_url", "description", "context"],
  },
});
