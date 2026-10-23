import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsCreateProjectsMergeRequestsCancelMergeWhenPipelineSucceeds = defineTool({
  name: "issues:merge_requests:create_projects_merge_requests_cancel_merge_when_pipeline_succeeds",
  description:
    "[Deprecated] Cancel merge when pipeline succeeds. Cancels an automatic merge for a merge request that has been set to merge when the pipeline succeeds. This endpoint does not return the merge request. Deprecated in GitLab 19.5. Use POST /projects/:id/merge_requests/:merge_request_iid/cancel_auto_merge instead.",
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
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/cancel_merge_when_pipeline_succeeds",
  },
});
