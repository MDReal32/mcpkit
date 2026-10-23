import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsListProjectsMergeRequestsContextCommits = defineTool({
  name: "issues:merge_requests:list_projects_merge_requests_context_commits",
  description: "List all context commits for a merge request. Lists all context commits for a specified merge request.",
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
    path: "/projects/{id}/merge_requests/{merge_request_iid}/context_commits",
  },
});
