import { defineTool } from "@usemcpkit/core";

export const issuesIssuesAddAssignees = defineTool({
  name: "issues:issues:add_assignees",
  description:
    "Add assignees to an issue. Adds up to 10 assignees to an issue. Users already assigned to an issue are not replaced.",
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
      assignees: {
        type: "array",
        description:
          "Usernames of people to assign this issue to. _NOTE: Only users with push access can add assignees to an issue. Assignees are silently ignored otherwise._",
        items: {
          type: "object",
          properties: {
            login: {
              type: "string",
              description: "The login of the user to assign.",
            },
            rationale: {
              type: "string",
              description: "Optional reasoning for adding this assignee.",
            },
            suggest: {
              type: "boolean",
              description:
                "If `true`, the assignee is stored as a pending suggestion for human review rather than applied directly.",
            },
            confidence: {
              type: "string",
              description: "The confidence level for this assignee choice.",
              enum: ["low", "medium", "high"],
            },
          },
        },
      },
    },
    required: ["owner", "repo", "issue_number"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/assignees",
    body: ["assignees"],
  },
});
