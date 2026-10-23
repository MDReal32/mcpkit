import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsDeleteProjectsSnippetsDiscussionsNotes = defineTool({
  name: "issues:discussions:delete_projects_snippets_discussions_notes",
  description: "Delete a comment from a snippet discussion. Deletes a specified comment from a snippet discussion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the snippet.",
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
    method: "DELETE",
    path: "/projects/{id}/snippets/{noteable_id}/discussions/{discussion_id}/notes/{note_id}",
  },
});
