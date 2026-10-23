import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiCreateProjectsMergeRequestsNotesAwardEmoji = defineTool({
  name: "issues:award_emoji:create_projects_merge_requests_notes_award_emoji",
  description:
    "Add an emoji reaction to a merge request comment. Adds an emoji reaction to a comment on a merge request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request.",
      },
      note_id: {
        type: "integer",
        description: "ID of the note.",
      },
      name: {
        type: "string",
        description: "Name of the emoji without colons.",
      },
    },
    required: ["id", "merge_request_iid", "note_id", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/notes/{note_id}/award_emoji",
    body: ["name"],
  },
});
