import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsListProjectsMergeRequestsReviewers = defineTool({
  name: "issues:merge_requests:list_projects_merge_requests_reviewers",
  description: "Retrieve merge request reviewers. Retrieves reviewers for a specified merge request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request.",
      },
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/reviewers",
  },
});
