import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsGetProjectsRepositoryCommitsDiscussionsNotes = defineTool({
  name: "issues:discussions:get_projects_repository_commits_discussions_notes",
  description: "Retrieve a comment from a commit discussion. Retrieves a specified comment from a commit discussion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "string",
        description: "ID of the commit.",
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
    path: "/projects/{id}/repository/commits/{noteable_id}/discussions/{discussion_id}/notes/{note_id}",
  },
});
