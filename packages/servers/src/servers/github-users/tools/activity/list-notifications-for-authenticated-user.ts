import { defineTool } from '@usemcpkit/core';

export const activityListNotificationsForAuthenticatedUser = defineTool({
  name: 'activity:list_notifications_for_authenticated_user',
  description:
    'List notifications for the authenticated user. List all notifications for the current user, sorted by most recently updated.',
  input: {
    type: 'object',
    properties: {
      all: {
        type: 'boolean',
        default: false,
        description: 'If `true`, show notifications marked as read.',
      },
      participating: {
        type: 'boolean',
        default: false,
        description: 'If `true`, only shows notifications in which the user is directly participating or mentioned.',
      },
      since: {
        type: 'string',
        description:
          'Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      before: {
        type: 'string',
        description:
          'Only show notifications updated before the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 50,
        description:
          'The number of results per page (max 50). For more information, see "Using pagination in the REST API."',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/notifications',
    query: ['all', 'participating', 'since', 'before', 'page', 'per_page'],
  },
});
