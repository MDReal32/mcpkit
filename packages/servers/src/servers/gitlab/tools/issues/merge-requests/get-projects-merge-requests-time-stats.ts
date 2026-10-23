import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsGetProjectsMergeRequestsTimeStats = defineTool({
  name: "issues:merge_requests:get_projects_merge_requests_time_stats",
  description:
    "Retrieve time tracking stats for a merge request. Retrieves time tracking stats for a specified merge request, including time estimate and time spent in seconds and human-readable format (for example, `1h 30m`).",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "The internal ID of the merge_request",
      },
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/time_stats",
  },
});
