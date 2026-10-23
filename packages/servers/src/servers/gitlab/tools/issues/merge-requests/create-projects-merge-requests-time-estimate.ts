import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsCreateProjectsMergeRequestsTimeEstimate = defineTool({
  name: "issues:merge_requests:create_projects_merge_requests_time_estimate",
  description:
    "Set the estimated time for a merge request. Sets an estimated time of work for a specified merge request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "The internal ID of the merge_request.",
      },
      duration: {
        type: "string",
        description: "Duration in human-readable format, for example `3h30m`.",
      },
    },
    required: ["id", "merge_request_iid", "duration"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/time_estimate",
    body: ["duration"],
  },
});
