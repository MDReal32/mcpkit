import { defineTool } from "@usemcpkit/core";

export const issuesDraftNotesCreateProjectsMergeRequestsDraftNotesBulkPublish = defineTool({
  name: "issues:draft_notes:create_projects_merge_requests_draft_notes_bulk_publish",
  description:
    "Publish all pending draft notes. Publishes all pending draft notes for the current user on the specified merge request. Optionally sets the reviewer state and posts a summary note.",
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
      reviewer_state: {
        type: "string",
        description: "Sets the review state after publishing. Does not record a formal approval.",
        enum: ["requested_changes", "reviewed"],
      },
      note: {
        type: "string",
        description: "Text of the summary note to add to the merge request.",
      },
      internal: {
        type: "boolean",
        description: "If `true`, the summary note is internal.",
        default: false,
      },
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/draft_notes/bulk_publish",
    body: ["reviewer_state", "note", "internal"],
  },
});
