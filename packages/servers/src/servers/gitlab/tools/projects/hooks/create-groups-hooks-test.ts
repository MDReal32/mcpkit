import { defineTool } from '@usemcpkit/core';

export const projectsHooksCreateGroupsHooksTest = defineTool({
  name: 'projects:hooks:create_groups_hooks_test',
  description:
    'Trigger a test webhook. Triggers a test webhook. This endpoint has a rate limit of five requests per minute for each authenticated user for a given project or group. On GitLab Self-Managed and GitLab Dedicated, an administrator can change this limit in the application settings.',
  input: {
    type: 'object',
    properties: {
      hook_id: {
        type: 'integer',
        description: 'ID of the hook.',
      },
      trigger: {
        type: 'string',
        enum: [
          'confidential_issues_events',
          'confidential_note_events',
          'deployment_events',
          'emoji_events',
          'feature_flag_events',
          'issues_events',
          'job_events',
          'merge_requests_events',
          'milestone_events',
          'note_events',
          'pipeline_events',
          'push_events',
          'releases_events',
          'resource_access_token_events',
          'resource_deploy_token_events',
          'tag_push_events',
          'wiki_page_events',
          'vulnerability_events',
        ],
        description: 'Type of webhook event to test.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['hook_id', 'trigger', 'id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/hooks/{hook_id}/test/{trigger}',
  },
});
