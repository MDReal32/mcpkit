import { defineTool } from "@usemcpkit/core";

export const issuesNotesListProjectsWikiPagesNotes = defineTool({
  name: "issues:notes:list_projects_wiki_pages_notes",
  description: "List all wiki page meta notes. Lists all notes for a specified wiki page meta.",
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
      order_by: {
        type: "string",
        default: "created_at",
        enum: ["created_at", "updated_at"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
      },
      activity_filter: {
        type: "string",
        default: "all_notes",
        enum: ["all_notes", "only_comments", "only_activity"],
        description: "Filter notes by activity type.",
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
    required: ["id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/wiki_pages/{noteable_id}/notes",
    query: ["order_by", "sort", "activity_filter", "page", "per_page"],
  },
});
