import { defineTool } from '@usemcpkit/core';

export const usersActivityMarkRepoNotificationsAsRead = defineTool({
  name: 'users:activity:mark_repo_notifications_as_read',
  description:
    'Mark repository notifications as read. Marks all notifications in a repository as "read" for the current user. If the number of notifications is too large to complete in one request, you will receive a `202 Accepted` status and GitHub will run an asynchronous process to mark notifications as "read." To check whether any "unread" notifications remain, you can use the List repository notifications for the authenticated user endpoint and…',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      last_read_at: {
        type: 'string',
        description:
          'Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/notifications',
    body: ['last_read_at'],
  },
});
