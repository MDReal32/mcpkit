import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsGetProjectsIssuesDiscussionsNotes = defineTool({
  name: "issues:discussions:get_projects_issues_discussions_notes",
  description: "Retrieve a comment from an issue discussion. Retrieves a specified comment from a issue discussion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the issue.",
      },
      discussion_id: {
        type: "string",
        description: "ID of the discussion.",
      },
      note_id: {
        type: "integer",
        description: "ID of the discussion note.",
      },
    },
    required: ["id", "noteable_id", "discussion_id", "note_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/issues/{noteable_id}/discussions/{discussion_id}/notes/{note_id}",
  },
});
