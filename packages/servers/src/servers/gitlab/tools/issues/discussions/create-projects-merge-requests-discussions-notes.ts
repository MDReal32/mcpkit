import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsCreateProjectsMergeRequestsDiscussionsNotes = defineTool({
  name: "issues:discussions:create_projects_merge_requests_discussions_notes",
  description: "Add a comment to a merge request discussion. Adds a comment to a specified merge request discussion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the merge request.",
      },
      discussion_id: {
        type: "string",
        description: "ID of the discussion.",
      },
      body: {
        type: "string",
        description: "Content of the note or reply.",
      },
      created_at: {
        type: "string",
        description:
          "Date and time the note was created, in ISO 8601 format such as `2016-03-11T03:45:40Z`. Requires administrator or project/group owner rights.",
      },
    },
    required: ["id", "noteable_id", "discussion_id", "body"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes",
    body: ["body", "created_at"],
  },
});
