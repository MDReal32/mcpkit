import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiDeleteProjectsMergeRequestsNotesAwardEmoji = defineTool({
  name: "issues:award_emoji:delete_projects_merge_requests_notes_award_emoji",
  description:
    "Delete an emoji reaction from a merge request comment. Deletes a specified emoji reaction from a comment on a merge request. Only an administrator or the user who added the reaction can delete it.",
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
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request.",
      },
      note_id: {
        type: "integer",
        description: "ID of the note.",
      },
    },
    required: ["award_id", "id", "merge_request_iid", "note_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/notes/{note_id}/award_emoji/{award_id}",
  },
});
