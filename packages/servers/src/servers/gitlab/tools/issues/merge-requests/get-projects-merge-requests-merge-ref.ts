import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsGetProjectsMergeRequestsMergeRef = defineTool({
  name: "issues:merge_requests:get_projects_merge_requests_merge_ref",
  description:
    "Merge to default merge ref path. Merges the changes between the merge request source and target branches into the `refs/merge-requests/:iid/merge` ref, of the target project repository, if possible. This ref has the state the target branch would have if a regular merge action was taken.",
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
    path: "/projects/{id}/merge_requests/{merge_request_iid}/merge_ref",
  },
});
