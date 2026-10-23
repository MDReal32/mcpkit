import { defineTool } from '@usemcpkit/core';

export const usersNotificationSettingsUpdateProjectsNotificationSettings = defineTool({
  name: 'users:notification_settings:update_projects_notification_settings',
  description: 'Update notification settings for a project. Updates the notification settings for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      level: {
        type: 'string',
        description: 'The project notification level',
      },
      new_release: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      new_note: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      new_issue: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      reopen_issue: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      close_issue: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      reassign_issue: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      issue_due: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      new_merge_request: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      push_to_merge_request: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      reopen_merge_request: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      close_merge_request: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      reassign_merge_request: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      change_reviewer_merge_request: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      merge_merge_request: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      failed_pipeline: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      fixed_pipeline: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      success_pipeline: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      moved_project: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      merge_when_pipeline_succeeds: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      approver: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      service_account_failed_pipeline: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      service_account_success_pipeline: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
      service_account_fixed_pipeline: {
        type: 'boolean',
        description: 'Enable/disable this notification',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/notification_settings',
    body: [
      'level',
      'new_release',
      'new_note',
      'new_issue',
      'reopen_issue',
      'close_issue',
      'reassign_issue',
      'issue_due',
      'new_merge_request',
      'push_to_merge_request',
      'reopen_merge_request',
      'close_merge_request',
      'reassign_merge_request',
      'change_reviewer_merge_request',
      'merge_merge_request',
      'failed_pipeline',
      'fixed_pipeline',
      'success_pipeline',
      'moved_project',
      'merge_when_pipeline_succeeds',
      'approver',
      'service_account_failed_pipeline',
      'service_account_success_pipeline',
      'service_account_fixed_pipeline',
    ],
  },
});
