import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsUpdateProjectsRepositoryCommitsDiscussionsNotes = defineTool({
  name: "issues:discussions:update_projects_repository_commits_discussions_notes",
  description:
    "Update a comment in a commit discussion. Updates or changes the status of a specified comment in a commit discussion.",
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
      body: {
        type: "string",
        description: "Content of the note or reply. Exactly one of `body`, `resolved` must be provided.",
      },
      resolved: {
        type: "boolean",
        description:
          "If `true`, resolves the note. If `false`, reopens the note. Exactly one of `body`, `resolved` must be provided.",
      },
    },
    required: ["id", "noteable_id", "discussion_id", "note_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/repository/commits/{noteable_id}/discussions/{discussion_id}/notes/{note_id}",
    body: ["body", "resolved"],
  },
});
