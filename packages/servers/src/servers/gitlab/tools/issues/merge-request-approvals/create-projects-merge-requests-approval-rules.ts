import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestApprovalsCreateProjectsMergeRequestsApprovalRules = defineTool({
  name: 'issues:merge_request_approvals:create_projects_merge_requests_approval_rules',
  description:
    'Create an approval rule for a merge request. Creates an approval rule for a specified merge request. If `approval_project_rule_id` is set with the ID of an existing approval rule from the project, this endpoint copies the values for `name`, `users`, and `groups` from the project rule.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      merge_request_iid: {
        type: 'integer',
        description: 'Internal ID of the merge request.',
      },
      name: {
        type: 'string',
        description: 'Name of the approval rule. Limited to 1024 characters.',
      },
      approvals_required: {
        type: 'integer',
        description: 'Number of required approvals for the rule.',
      },
      approval_project_rule_id: {
        type: 'integer',
        description: 'ID of a project-level approval rule.',
      },
      user_ids: {
        type: 'array',
        description: 'IDs of users to add as approvers. If used with `usernames`, adds both lists of users.',
        items: {
          type: 'integer',
        },
      },
      group_ids: {
        type: 'array',
        description: 'IDs of groups to add as approvers.',
        items: {
          type: 'integer',
        },
      },
      usernames: {
        type: 'array',
        description: 'Usernames of users to add as approvers. If used with `user_ids`, adds both lists of users.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['id', 'merge_request_iid', 'name', 'approvals_required'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/approval_rules',
    body: ['name', 'approvals_required', 'approval_project_rule_id', 'user_ids', 'group_ids', 'usernames'],
  },
});
