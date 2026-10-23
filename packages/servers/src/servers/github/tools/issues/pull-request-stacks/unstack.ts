import { defineTool } from "@usemcpkit/core";

export const issuesPullRequestStacksUnstack = defineTool({
  name: "issues:pull_request_stacks:unstack",
  description:
    "Remove pull requests from a pull request stack. Removes the unmerged pull requests from a stack. Pull requests that cannot be unstacked (for example, those that are queued for merge) are left in place. When pull requests remain in the stack, the updated stack is returned with a `200`. When no pull requests remain, the stack is dissolved and a `204` is returned.",
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
      stack_number: {
        type: "integer",
        description: "The number that identifies the pull request stack.",
      },
    },
    required: ["owner", "repo", "stack_number"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/stacks/{stack_number}/unstack",
  },
});
