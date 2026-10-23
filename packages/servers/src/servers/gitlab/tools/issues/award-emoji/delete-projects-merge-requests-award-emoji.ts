import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiDeleteProjectsMergeRequestsAwardEmoji = defineTool({
  name: "issues:award_emoji:delete_projects_merge_requests_award_emoji",
  description:
    "Delete an emoji reaction from a merge request. Deletes a specified emoji reaction from a merge request. Only an administrator or the user who added the reaction can delete it.",
  input: {
    type: "object",
    properties: {
      award_id: {
        type: "integer",
        description: "ID of the emoji reaction.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request.",
      },
    },
    required: ["award_id", "id", "merge_request_iid"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/award_emoji/{award_id}",
  },
});
