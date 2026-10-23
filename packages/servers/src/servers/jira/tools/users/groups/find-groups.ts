import { defineTool } from '@usemcpkit/core';

export const usersGroupsFindGroups = defineTool({
  name: 'users:groups:find_groups',
  description:
    'Find groups. Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude groups from the results.',
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'This parameter is deprecated, setting it does not affect the results. To find groups containing a particular user, use Get user groups.',
      },
      query: {
        type: 'string',
        description: 'The string to find in group names.',
      },
      exclude: {
        type: 'string',
        description:
          "As a group's name can change, use of `excludeGroupIds` is recommended to identify a group. A group to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `exclude=group1&exclude=group2`. This parameter cannot be used with the `excludeGroupIds` parameter. (comma-separated)",
      },
      excludeId: {
        type: 'string',
        description:
          'A group ID to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `excludeId=group1-id&excludeId=group2-id`. This parameter cannot be used with the `excludeGroups` parameter. (comma-separated)',
      },
      maxResults: {
        type: 'integer',
        description:
          'The maximum number of groups to return. The maximum number of groups that can be returned is limited by the system property `jira.ajax.autocomplete.limit`.',
      },
      caseInsensitive: {
        type: 'boolean',
        default: false,
        description: 'Whether the search for groups should be case insensitive.',
      },
      userName: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/groups/picker',
    query: ['accountId', 'query', 'exclude', 'excludeId', 'maxResults', 'caseInsensitive', 'userName'],
  },
});
