import { defineTool } from "@usemcpkit/core";

export const issuesIssuesGetParent = defineTool({
  name: "issues:issues:get_parent",
  description: "Get parent issue. You can use the REST API to get the parent issue of a sub-issue.",
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
      issue_number: {
        type: "integer",
        description: "The number that identifies the issue.",
      },
    },
    required: ["owner", "repo", "issue_number"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/parent",
  },
});
