import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiCreateProjectsSnippetsNotesAwardEmoji = defineTool({
  name: "issues:award_emoji:create_projects_snippets_notes_award_emoji",
  description: "Add an emoji reaction to a snippet comment. Adds an emoji reaction to a comment on a snippet.",
  input: {
    type: "object",
    properties: {
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
      name: {
        type: "string",
        description: "Name of the emoji without colons.",
      },
    },
    required: ["id", "snippet_id", "note_id", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/snippets/{snippet_id}/notes/{note_id}/award_emoji",
    body: ["name"],
  },
});
