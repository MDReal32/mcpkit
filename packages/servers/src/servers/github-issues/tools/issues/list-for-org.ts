import { defineTool } from '@usemcpkit/core';

export const issuesListForOrg = defineTool({
  name: 'issues:list_for_org',
  description:
    'List organization issues assigned to the authenticated user. List issues in an organization assigned to the authenticated user.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
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
      type: {
        type: 'string',
        description: 'Can be the name of an issue type.',
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
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/issues',
    query: ['filter', 'state', 'labels', 'type', 'sort', 'direction', 'since', 'per_page', 'page'],
  },
});
