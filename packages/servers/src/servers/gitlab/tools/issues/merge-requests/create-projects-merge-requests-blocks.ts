import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsCreateProjectsMergeRequestsBlocks = defineTool({
  name: "issues:merge_requests:create_projects_merge_requests_blocks",
  description:
    "Create a merge request dependency. Creates a merge request dependency between two merge requests. The merge request is blocked until the dependency merges.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request to be blocked.",
      },
      blocking_merge_request_id: {
        type: "integer",
        description:
          "Global ID of the blocking merge request. Required if `blocking_merge_request_iid` is not provided. Mutually exclusive with `blocking_merge_request_iid`. Exactly one of `blocking_merge_request_id`, `blocking_merge_request_iid` must be provided.",
      },
      blocking_merge_request_iid: {
        type: "integer",
        description:
          "Internal ID of the blocking merge request. Required if `blocking_merge_request_id` is not provided. Mutually exclusive with `blocking_merge_request_id`. Exactly one of `blocking_merge_request_id`, `blocking_merge_request_iid` must be provided.",
      },
      blocking_project_id: {
        type: "string",
        description:
          "ID or URL-encoded path of the project containing the blocking merge request. Required when `blocking_merge_request_iid` refers to a merge request in a different project. Defaults to the current project.",
      },
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/blocks",
    body: ["blocking_merge_request_id", "blocking_merge_request_iid", "blocking_project_id"],
  },
});
