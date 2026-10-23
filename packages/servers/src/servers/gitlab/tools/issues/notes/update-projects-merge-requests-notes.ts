import { defineTool } from "@usemcpkit/core";

export const issuesNotesUpdateProjectsMergeRequestsNotes = defineTool({
  name: "issues:notes:update_projects_merge_requests_notes",
  description: "Update a merge request note. Updates an existing note for a merge request.",
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
      body: {
        type: "string",
        description: "Content of the note. Limited to 1,000,000 characters.",
      },
      confidential: {
        type: "boolean",
        description:
          "If `true`, the note must already be confidential. If `false`, it must not be. Confidentiality cannot be changed after a note is created. Deprecated.",
      },
    },
    required: ["id", "noteable_id", "note_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/merge_requests/{noteable_id}/notes/{note_id}",
    body: ["body", "confidential"],
  },
});
