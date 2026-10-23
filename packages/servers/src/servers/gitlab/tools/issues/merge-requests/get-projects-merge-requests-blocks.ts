import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsGetProjectsMergeRequestsBlocks = defineTool({
  name: "issues:merge_requests:get_projects_merge_requests_blocks",
  description: "Retrieve a merge request dependency. Retrieves a specified merge request dependency.",
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
      block_id: {
        type: "integer",
        description: "ID of the merge request block.",
      },
    },
    required: ["id", "merge_request_iid", "block_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/blocks/{block_id}",
  },
});
