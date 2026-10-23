import { defineTool } from "@usemcpkit/core";

export const issuesNotesGetGroupsEpicsNotes = defineTool({
  name: "issues:notes:get_groups_epics_notes",
  description: "Retrieve an epic note. Retrieves a specified note for an epic.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      note_id: {
        type: "integer",
        description: "ID of the note.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the resource the note is attached to.",
      },
    },
    required: ["id", "note_id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{noteable_id}/notes/{note_id}",
  },
});
