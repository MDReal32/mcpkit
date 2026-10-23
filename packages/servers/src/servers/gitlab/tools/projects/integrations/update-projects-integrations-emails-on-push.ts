import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsIntegrationsEmailsOnPush = defineTool({
  name: 'projects:integrations:update_projects_integrations_emails_on_push',
  description: 'Create or update the Emails On Push integration. Creates or updates the Emails On Push integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      send_from_committer_email: {
        type: 'boolean',
        description: 'Send from committer',
      },
      disable_diffs: {
        type: 'boolean',
        description: 'Disable code diffs',
      },
      branches_to_be_notified: {
        type: 'string',
        description:
          'Branches to send notifications for. Valid options are `all`, `default`, `protected`, and `default_and_protected`. The default value is `default`.',
      },
      recipients: {
        type: 'string',
        description: 'Emails separated by whitespace.',
      },
      push_events: {
        type: 'boolean',
        description: 'Trigger event for pushes to the repository.',
      },
      tag_push_events: {
        type: 'boolean',
        description: 'Trigger event for new tags pushed to the repository.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'recipients'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/integrations/emails-on-push',
    body: [
      'send_from_committer_email',
      'disable_diffs',
      'branches_to_be_notified',
      'recipients',
      'push_events',
      'tag_push_events',
      'use_inherited_settings',
    ],
  },
});
