import { defineTool } from "@usemcpkit/core";

export const issuesProjectApprovalsCreateProjectsApprovals = defineTool({
  name: "issues:project_approvals:create_projects_approvals",
  description:
    "Create or update approval configuration for a project. Creates or updates the approval configuration for a project. The currently authenticated user must be an eligible approver.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      approvals_before_merge: {
        type: "integer",
        description:
          "Number of approvals required before a merge request can be merged. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.",
      },
      reset_approvals_on_push: {
        type: "boolean",
        description:
          "If `true`, resets approvals on push. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.",
      },
      selective_code_owner_removals: {
        type: "boolean",
        description:
          "If `true`, resets approvals from Code Owners if their files change. To use this field, `reset_approvals_on_push` must be `false`. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_approve`, `requi…",
      },
      disable_overriding_approvers_per_merge_request: {
        type: "boolean",
        description:
          "If `true`, prevents overrides of approvers in a merge request. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.",
      },
      merge_requests_author_approval: {
        type: "boolean",
        description:
          "If `true`, authors can self-approve merge requests. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.",
      },
      merge_requests_disable_committers_approval: {
        type: "boolean",
        description:
          "If `true`, users who commit on the merge request cannot approve it. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.",
      },
      require_password_to_approve: {
        type: "boolean",
        description:
          "If `true`, requires approvers to authenticate before approving. Deprecated in GitLab 16.9. Use `require_reauthentication_to_approve` instead. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_appr…",
      },
      require_reauthentication_to_approve: {
        type: "boolean",
        description:
          "If `true`, requires approvers to authenticate before approving. Introduced in GitLab 17.1. At least one of `approvals_before_merge`, `reset_approvals_on_push`, `selective_code_owner_removals`, `disable_overriding_approvers_per_merge_request`, `merge_requests_author_approval`, `merge_requests_disable_committers_approval`, `require_password_to_approve`, `require_reauthentication_to_approve` must be…",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/approvals",
    body: [
      "approvals_before_merge",
      "reset_approvals_on_push",
      "selective_code_owner_removals",
      "disable_overriding_approvers_per_merge_request",
      "merge_requests_author_approval",
      "merge_requests_disable_committers_approval",
      "require_password_to_approve",
      "require_reauthentication_to_approve",
    ],
  },
});
