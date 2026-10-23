import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiListProjectsMergeRequestsAwardEmoji = defineTool({
  name: "issues:award_emoji:list_projects_merge_requests_award_emoji",
  description:
    "List all emoji reactions for a merge request. Lists all emoji reactions for a specified merge request. This endpoint can be accessed without authentication if the merge request is publicly accessible.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "ID (`iid` for merge requests/issues/epics, `id` for snippets) of an awardable.",
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
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/award_emoji",
    query: ["page", "per_page"],
  },
});
