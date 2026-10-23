import { defineTool } from '@usemcpkit/core';

export const issuesToDosListTodos = defineTool({
  name: 'issues:to_dos:list_todos',
  description:
    'List all to-do items. Lists all to-do items. When no filter is applied, it returns all pending to-do items for the current user. Different filters allow the user to refine the request.',
  input: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
      action: {
        type: 'string',
        enum: [
          'assigned',
          'review_requested',
          'mentioned',
          'build_failed',
          'marked',
          'approval_required',
          'unmergeable',
          'directly_addressed',
          'member_access_requested',
          'review_submitted',
          'ssh_key_expired',
          'ssh_key_expiring_soon',
          'transfer_failed',
          'merge_train_removed',
          'okr_checkin_requested',
          'added_approver',
          'duo_pro_access_granted',
          'duo_enterprise_access_granted',
          'duo_core_access_granted',
          'duo_workflow_input_required',
        ],
        description: 'Filter to-do items by action.',
      },
      author_id: {
        type: 'integer',
        description: 'Filter to-do items by author ID.',
      },
      project_id: {
        type: 'integer',
        description: 'Filter to-do items by project ID.',
      },
      group_id: {
        type: 'integer',
        description: 'Filter to-do items by group ID.',
      },
      state: {
        type: 'string',
        enum: ['pending', 'done'],
        description: 'Filter to-do items by state.',
      },
      type: {
        type: 'string',
        enum: [
          'Commit',
          'Issue',
          'WorkItem',
          'MergeRequest',
          'DesignManagement::Design',
          'AlertManagement::Alert',
          'Namespace',
          'Project',
          'Key',
          'WikiPage::Meta',
          'Epic',
          'Vulnerability',
          'User',
          'ComplianceManagement::Projects::ComplianceViolation',
          'Ai::DuoWorkflows::Workflow',
        ],
        description: 'Filter to-do items by type.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/todos',
    query: ['page', 'per_page', 'action', 'author_id', 'project_id', 'group_id', 'state', 'type'],
  },
});
