import { defineTool } from '@usemcpkit/core';

export const usersUserSearchFindBulkAssignableUsers = defineTool({
  name: 'users:user_search:find_bulk_assignable_users',
  description:
    'Find users assignable to projects. Returns a list of users who can be assigned issues in one or more projects. The list may be restricted to users whose attributes match a string.',
  input: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          "A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified.",
      },
      username: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details.',
      },
      accountId: {
        type: 'string',
        description:
          'A query string that is matched exactly against user `accountId`. Required, unless `query` is specified.',
      },
      projectKeys: {
        type: 'string',
        description: 'A list of project keys (case sensitive). This parameter accepts a comma-separated list.',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page.',
      },
    },
    required: ['projectKeys'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user/assignable/multiProjectSearch',
    query: ['query', 'username', 'accountId', 'projectKeys', 'startAt', 'maxResults'],
  },
});
