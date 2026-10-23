import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsGetGroupsMergeRequestApprovalSetting = defineTool({
  name: "issues:merge_request_approvals:get_groups_merge_request_approval_setting",
  description:
    "Retrieve MR approval settings for a group. Retrieves the merge request approval settings for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/merge_request_approval_setting",
  },
});
