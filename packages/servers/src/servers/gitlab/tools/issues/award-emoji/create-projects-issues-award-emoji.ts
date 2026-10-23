import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiCreateProjectsIssuesAwardEmoji = defineTool({
  name: "issues:award_emoji:create_projects_issues_award_emoji",
  description: "Add an emoji reaction to an issue. Adds an emoji reaction to an issue.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "The internal ID of an issuable",
      },
      name: {
        type: "string",
        description: "Name of the emoji without colons.",
      },
    },
    required: ["id", "issue_iid", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/issues/{issue_iid}/award_emoji",
    body: ["name"],
  },
});
