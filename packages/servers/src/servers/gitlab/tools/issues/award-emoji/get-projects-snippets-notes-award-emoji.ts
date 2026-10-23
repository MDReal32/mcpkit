import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiGetProjectsSnippetsNotesAwardEmoji = defineTool({
  name: "issues:award_emoji:get_projects_snippets_notes_award_emoji",
  description:
    "Retrieve an emoji reaction from a snippet comment. Retrieves a specified emoji reaction from a comment on a snippet. This endpoint can be accessed without authentication if the comment is publicly accessible.",
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
      snippet_id: {
        type: "integer",
        description: "ID of the snippet.",
      },
      note_id: {
        type: "integer",
        description: "ID of the note.",
      },
    },
    required: ["award_id", "id", "snippet_id", "note_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/snippets/{snippet_id}/notes/{note_id}/award_emoji/{award_id}",
  },
});
