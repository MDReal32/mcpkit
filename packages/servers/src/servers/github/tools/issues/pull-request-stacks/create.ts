import { defineTool } from "@usemcpkit/core";

export const issuesPullRequestStacksCreate = defineTool({
  name: "issues:pull_request_stacks:create",
  description:
    "Create a pull request stack. Creates a stack from an ordered list of pull request numbers. Provide the pull request numbers from the bottom of the stack to the top. Each pull request's base ref must match the previous pull request's head ref.",
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
      pull_requests: {
        type: "array",
        description: "An ordered list of pull request numbers forming the stack from bottom to top.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["owner", "repo", "pull_requests"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/stacks",
    body: ["pull_requests"],
  },
});
