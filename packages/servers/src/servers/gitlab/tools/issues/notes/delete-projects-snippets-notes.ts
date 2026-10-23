import { defineTool } from "@usemcpkit/core";

export const issuesNotesDeleteProjectsSnippetsNotes = defineTool({
  name: "issues:notes:delete_projects_snippets_notes",
  description: "Delete a snippet note. Deletes a specified note from a snippet.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the resource the note is attached to.",
      },
      note_id: {
        type: "integer",
        description: "ID of the note.",
      },
    },
    required: ["id", "noteable_id", "note_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/snippets/{noteable_id}/notes/{note_id}",
  },
});
