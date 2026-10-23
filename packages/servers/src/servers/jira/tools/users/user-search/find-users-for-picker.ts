import { defineTool } from '@usemcpkit/core';

export const usersUserSearchFindUsersForPicker = defineTool({
  name: 'users:user_search:find_users_for_picker',
  description:
    'Find users for picker. Returns a list of users whose attributes match the query term. The returned object includes the `html` field where the matched query term is highlighted with the HTML strong tag. A list of account IDs can be provided to exclude users from the results.',
  input: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          "A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*.",
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return. The total number of matched users is returned in `total`.',
      },
      showAvatar: {
        type: 'boolean',
        default: false,
        description: "Include the URI to the user's avatar.",
      },
      exclude: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details. (comma-separated)',
      },
      excludeAccountIds: {
        type: 'string',
        description:
          'A list of account IDs to exclude from the search results. This parameter accepts a comma-separated list. Multiple account IDs can also be provided using an ampersand-separated list. For example, `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`. Cannot be provided with `exclude`. (comma-separated)',
      },
      avatarSize: {
        type: 'string',
      },
      excludeConnectUsers: {
        type: 'boolean',
        default: false,
      },
    },
    required: ['query'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user/picker',
    query: ['query', 'maxResults', 'showAvatar', 'exclude', 'excludeAccountIds', 'avatarSize', 'excludeConnectUsers'],
  },
});
