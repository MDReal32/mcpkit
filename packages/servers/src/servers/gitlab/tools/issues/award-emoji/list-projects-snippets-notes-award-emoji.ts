import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiListProjectsSnippetsNotesAwardEmoji = defineTool({
  name: "issues:award_emoji:list_projects_snippets_notes_award_emoji",
  description:
    "List all emoji reactions for a snippet comment. Lists all emoji reactions for a specified comment on a snippet. This endpoint can be accessed without authentication if the comment is publicly accessible.",
  input: {
    type: "object",
    properties: {
      note_id: {
        type: "integer",
        description: "ID of the note.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      snippet_id: {
        type: "integer",
        description: "ID of the snippet.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["note_id", "id", "snippet_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/snippets/{snippet_id}/notes/{note_id}/award_emoji",
    query: ["page", "per_page"],
  },
});
