import { defineTool } from "@usemcpkit/core";

export const issuesDraftNotesUpdateProjectsMergeRequestsDraftNotesPublish = defineTool({
  name: "issues:draft_notes:update_projects_merge_requests_draft_notes_publish",
  description: "Publish a draft note. Publishes a draft note for a specified merge request.",
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
      draft_note_id: {
        type: "integer",
        description: "ID of the draft note.",
      },
    },
    required: ["id", "merge_request_iid", "draft_note_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/draft_notes/{draft_note_id}/publish",
  },
});
