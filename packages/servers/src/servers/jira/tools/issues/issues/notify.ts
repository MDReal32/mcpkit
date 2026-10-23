import { defineTool } from '@usemcpkit/core';

export const issuesIssuesNotify = defineTool({
  name: 'issues:issues:notify',
  description: 'Send notification for issue. Creates an email notification for an issue and adds it to the mail queue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'ID or key of the issue that the notification is sent for.',
      },
      htmlBody: {
        type: 'string',
        description: 'The HTML body of the email notification for the issue.',
      },
      restrict: {
        type: 'object',
        description: 'Restricts the notifications to users with the specified permissions.',
        properties: {
          groupIds: {
            type: 'array',
            description: 'List of groupId memberships required to receive the notification.',
            items: {
              type: 'string',
            },
          },
          groups: {
            type: 'array',
            description: 'List of group memberships required to receive the notification.',
            items: {
              type: 'object',
              description: 'Details about a group.',
            },
          },
          permissions: {
            type: 'array',
            description: 'List of permissions required to receive the notification.',
            items: {
              type: 'object',
              description: 'Details of the permission.',
            },
          },
        },
      },
      subject: {
        type: 'string',
        description:
          'The subject of the email notification for the issue. If this is not specified, then the subject is set to the issue key and summary.',
      },
      textBody: {
        type: 'string',
        description: 'The plain text body of the email notification for the issue.',
      },
      to: {
        type: 'object',
        description: 'The recipients of the email notification for the issue.',
        properties: {
          assignee: {
            type: 'boolean',
            description: "Whether the notification should be sent to the issue's assignees.",
          },
          groupIds: {
            type: 'array',
            description: 'List of groupIds to receive the notification.',
            items: {
              type: 'string',
            },
          },
          groups: {
            type: 'array',
            description: 'List of groups to receive the notification.',
            items: {
              type: 'object',
              description: 'Details about a group.',
            },
          },
          reporter: {
            type: 'boolean',
            description: "Whether the notification should be sent to the issue's reporter.",
          },
          users: {
            type: 'array',
            description: 'List of users to receive the notification.',
            items: {
              type: 'object',
              description:
                "User details permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:",
            },
          },
          voters: {
            type: 'boolean',
            description: "Whether the notification should be sent to the issue's voters.",
          },
          watchers: {
            type: 'boolean',
            description: "Whether the notification should be sent to the issue's watchers.",
          },
        },
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/{issueIdOrKey}/notify',
    body: ['htmlBody', 'restrict', 'subject', 'textBody', 'to'],
  },
});
