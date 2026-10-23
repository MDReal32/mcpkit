import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiListProjectsIssuesNotesAwardEmoji = defineTool({
  name: "issues:award_emoji:list_projects_issues_notes_award_emoji",
  description:
    "List all emoji reactions for an issue comment. Lists all emoji reactions for a specified comment on an issue. This endpoint can be accessed without authentication if the comment is publicly accessible.",
  input: {
    type: "object",
    properties: {
      note_id: {
        type: "integer",
        description: "ID of the note.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "The internal ID of an issuable",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["note_id", "id", "issue_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/issues/{issue_iid}/notes/{note_id}/award_emoji",
    query: ["page", "per_page"],
  },
});
