import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestApprovalsUpdateProjectsMergeRequestApprovalSetting = defineTool({
  name: 'issues:merge_request_approvals:update_projects_merge_request_approval_setting',
  description:
    'Update MR approval settings for a project. Updates the merge request approval settings for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      allow_author_approval: {
        type: 'boolean',
        description:
          'If `true`, authors can self-approve merge requests. At least one of `allow_author_approval`, `allow_committer_approval`, `allow_overrides_to_approver_list_per_merge_request`, `retain_approvals_on_push`, `selective_code_owner_removals`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.',
      },
      allow_committer_approval: {
        type: 'boolean',
        description:
          'If `true`, committers can self-approve merge requests. At least one of `allow_author_approval`, `allow_committer_approval`, `allow_overrides_to_approver_list_per_merge_request`, `retain_approvals_on_push`, `selective_code_owner_removals`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.',
      },
      allow_overrides_to_approver_list_per_merge_request: {
        type: 'boolean',
        description:
          'If `true`, allows overriding approvers per merge request. At least one of `allow_author_approval`, `allow_committer_approval`, `allow_overrides_to_approver_list_per_merge_request`, `retain_approvals_on_push`, `selective_code_owner_removals`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.',
      },
      retain_approvals_on_push: {
        type: 'boolean',
        description:
          'If `true`, retains the approval count on a new push. At least one of `allow_author_approval`, `allow_committer_approval`, `allow_overrides_to_approver_list_per_merge_request`, `retain_approvals_on_push`, `selective_code_owner_removals`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.',
      },
      selective_code_owner_removals: {
        type: 'boolean',
        description:
          'If `true`, resets approvals from Code Owners if their files change. To use this field, `retain_approvals_on_push` must be `true`. At least one of `allow_author_approval`, `allow_committer_approval`, `allow_overrides_to_approver_list_per_merge_request`, `retain_approvals_on_push`, `selective_code_owner_removals`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.',
      },
      require_password_to_approve: {
        type: 'boolean',
        description:
          'If `true`, requires approvers to authenticate before approving. Deprecated in GitLab 16.9. Use `require_reauthentication_to_approve` instead, which takes precedence if both are provided. At least one of `allow_author_approval`, `allow_committer_approval`, `allow_overrides_to_approver_list_per_merge_request`, `retain_approvals_on_push`, `selective_code_owner_removals`, `require_password_to_approve…',
      },
      require_reauthentication_to_approve: {
        type: 'boolean',
        description:
          'If `true`, requires approvers to authenticate before approving. Introduced in GitLab 17.1. At least one of `allow_author_approval`, `allow_committer_approval`, `allow_overrides_to_approver_list_per_merge_request`, `retain_approvals_on_push`, `selective_code_owner_removals`, `require_password_to_approve`, `require_reauthentication_to_approve` must be provided.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/merge_request_approval_setting',
    body: [
      'allow_author_approval',
      'allow_committer_approval',
      'allow_overrides_to_approver_list_per_merge_request',
      'retain_approvals_on_push',
      'selective_code_owner_removals',
      'require_password_to_approve',
      'require_reauthentication_to_approve',
    ],
  },
});
