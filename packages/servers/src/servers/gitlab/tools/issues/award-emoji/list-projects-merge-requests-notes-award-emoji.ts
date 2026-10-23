import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiListProjectsMergeRequestsNotesAwardEmoji = defineTool({
  name: "issues:award_emoji:list_projects_merge_requests_notes_award_emoji",
  description:
    "List all emoji reactions for a merge request comment. Lists all emoji reactions for a specified comment on a merge request. This endpoint can be accessed without authentication if the comment is publicly accessible.",
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
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request.",
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
    required: ["note_id", "id", "merge_request_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/notes/{note_id}/award_emoji",
    query: ["page", "per_page"],
  },
});
