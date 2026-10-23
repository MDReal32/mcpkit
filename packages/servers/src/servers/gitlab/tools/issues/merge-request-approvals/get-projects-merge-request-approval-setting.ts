import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsGetProjectsMergeRequestApprovalSetting = defineTool({
  name: "issues:merge_request_approvals:get_projects_merge_request_approval_setting",
  description:
    "Retrieve MR approval settings for a project. Retrieves the merge request approval settings for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_request_approval_setting",
  },
});
