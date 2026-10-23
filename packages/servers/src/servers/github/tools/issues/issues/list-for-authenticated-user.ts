import { defineTool } from '@usemcpkit/core';

export const issuesIssuesListForAuthenticatedUser = defineTool({
  name: 'issues:issues:list_for_authenticated_user',
  description:
    'List user account issues assigned to the authenticated user. List issues across owned and member repositories assigned to the authenticated user.',
  input: {
    type: 'object',
    properties: {
      filter: {
        type: 'string',
        default: 'assigned',
        enum: ['assigned', 'created', 'mentioned', 'subscribed', 'repos', 'all'],
        description:
          "Indicates which sorts of issues to return. `assigned` means issues assigned to you. `created` means issues created by you. `mentioned` means issues mentioning you. `subscribed` means issues you're subscribed to updates for. `all` or `repos` means all issues you can see, regardless of participation or creation.",
      },
      state: {
        type: 'string',
        default: 'open',
        enum: ['open', 'closed', 'all'],
        description: 'Indicates the state of the issues to return.',
      },
      labels: {
        type: 'string',
        description: 'A list of comma separated label names. Example: `bug,ui,@high`',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated', 'comments'],
        description: 'What to sort results by.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      since: {
        type: 'string',
        description:
          'Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
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
  },
  request: {
    method: 'GET',
    path: '/user/issues',
    query: ['filter', 'state', 'labels', 'sort', 'direction', 'since', 'per_page', 'page'],
  },
});
