import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiGetProjectsIssuesAwardEmoji = defineTool({
  name: "issues:award_emoji:get_projects_issues_award_emoji",
  description:
    "Retrieve an emoji reaction from an issue. Retrieves a specified emoji reaction from an issue. This endpoint can be accessed without authentication if the issue is publicly accessible.",
  input: {
    type: "object",
    properties: {
      award_id: {
        type: "integer",
        description: "ID of the emoji reaction.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "The internal ID of an issuable",
      },
    },
    required: ["award_id", "id", "issue_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/issues/{issue_iid}/award_emoji/{award_id}",
  },
});
