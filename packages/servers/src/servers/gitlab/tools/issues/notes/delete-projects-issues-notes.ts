import { defineTool } from "@usemcpkit/core";

export const issuesNotesDeleteProjectsIssuesNotes = defineTool({
  name: "issues:notes:delete_projects_issues_notes",
  description: "Delete an issue note. Deletes a specified note from an issue.",
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
    path: "/projects/{id}/issues/{noteable_id}/notes/{note_id}",
  },
});
