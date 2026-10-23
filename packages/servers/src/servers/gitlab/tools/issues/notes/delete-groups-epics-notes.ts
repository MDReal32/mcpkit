import { defineTool } from "@usemcpkit/core";

export const issuesNotesDeleteGroupsEpicsNotes = defineTool({
  name: "issues:notes:delete_groups_epics_notes",
  description: "Delete an epic note. Deletes a specified note from an epic.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
    path: "/groups/{id}/epics/{noteable_id}/notes/{note_id}",
  },
});
