import { defineTool } from '@usemcpkit/core';

export const activityListRepoNotificationsForAuthenticatedUser = defineTool({
  name: 'activity:list_repo_notifications_for_authenticated_user',
  description:
    'List repository notifications for the authenticated user. Lists all notifications for the current user in the specified repository.',
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/notifications',
    query: ['all', 'participating', 'since', 'before', 'per_page', 'page'],
  },
});
