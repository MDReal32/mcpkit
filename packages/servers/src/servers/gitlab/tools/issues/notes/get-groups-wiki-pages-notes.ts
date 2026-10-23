import { defineTool } from "@usemcpkit/core";

export const issuesNotesGetGroupsWikiPagesNotes = defineTool({
  name: "issues:notes:get_groups_wiki_pages_notes",
  description: "Retrieve a wiki page meta note. Retrieves a specified note for a wiki page meta.",
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
    path: "/groups/{id}/wiki_pages/{noteable_id}/notes/{note_id}",
  },
});
