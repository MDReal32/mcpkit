import { defineTool } from '@usemcpkit/core';

export const usersGroupsBulkGetGroups = defineTool({
  name: 'users:groups:bulk_get_groups',
  description: 'Bulk get groups. Returns a paginated list of groups.',
  input: {
    type: 'object',
    properties: {
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
      groupId: {
        type: 'string',
        description:
          'The ID of a group. To specify multiple IDs, pass multiple `groupId` parameters. For example, `groupId=5b10a2844c20165700ede21g&groupId=5b10ac8d82e05b22cc7d4ef5`. (comma-separated)',
      },
      groupName: {
        type: 'string',
        description:
          'The name of a group. To specify multiple names, pass multiple `groupName` parameters. For example, `groupName=administrators&groupName=jira-software-users`. (comma-separated)',
      },
      accessType: {
        type: 'string',
        description: "The access level of a group. Valid values: 'site-admin', 'admin', 'user'.",
      },
      applicationKey: {
        type: 'string',
        description:
          "The application key of the product user groups to search for. Valid values: 'jira-servicedesk', 'jira-software', 'jira-product-discovery', 'jira-core'.",
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/group/bulk',
    query: ['startAt', 'maxResults', 'groupId', 'groupName', 'accessType', 'applicationKey'],
  },
});
