import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsCreateProjectsMergeRequestsApprove = defineTool({
  name: "issues:merge_request_approvals:create_projects_merge_requests_approve",
  description:
    "Approve merge request. Approves a specified merge request. The currently authenticated user must be an eligible approver. The `sha` parameter ensures you are approving the current version of the merge request. If defined, the value must match the merge request’s HEAD commit SHA. A mismatch returns a `409 Conflict` response.",
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
      sha: {
        type: "string",
        description: "SHA at `HEAD` of the source branch of the merge request.",
      },
      publish_review: {
        type: "boolean",
        description: "If `true`, submits pending review comments.",
      },
      approval_password: {
        type: "string",
        description:
          "Current user's password, needed if user re-authentication to approve is enabled in the project settings. Always fails if the group or GitLab Self-Managed instance is configured to force SAML authentication.",
      },
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/approve",
    body: ["sha", "publish_review", "approval_password"],
  },
});
