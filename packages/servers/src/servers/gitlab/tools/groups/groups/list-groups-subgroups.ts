import { defineTool } from '@usemcpkit/core';

export const groupsGroupsListGroupsSubgroups = defineTool({
  name: 'groups:groups:list_groups_subgroups',
  description: 'List all subgroups. Lists all subgroups for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      statistics: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes group statistics. Administrators only.',
      },
      archived: {
        type: 'boolean',
        description: 'If `true`, returns only archived groups or projects.',
      },
      skip_groups: {
        type: 'string',
        description: 'Skip the specified group IDs. (comma-separated)',
      },
      all_available: {
        type: 'boolean',
        description:
          'If `true`, returns all accessible groups. If `false`, returns only groups where the user is a member. When omitted, administrators receive all groups and other authenticated users receive only their own. Unauthenticated requests always return all public groups. The `owned` and `min_access_level` attributes take precedence.',
      },
      visibility: {
        type: 'string',
        enum: ['private', 'internal', 'public'],
        description: 'Return groups with the specified visibility.',
      },
      search: {
        type: 'string',
        description: 'Return the list of authorized groups matching the search criteria.',
      },
      owned: {
        type: 'boolean',
        default: false,
        description: 'If `true`, returns only groups explicitly owned by the current user.',
      },
      order_by: {
        type: 'string',
        default: 'name',
        enum: ['name', 'path', 'id', 'similarity'],
        description: 'Sort results by the specified field.',
      },
      sort: {
        type: 'string',
        default: 'asc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
      min_access_level: {
        type: 'integer',
        enum: [10, 15, 20, 25, 30, 40, 50],
        description:
          'Return groups where the current user has at least the specified access level. For a list of values, see roles.',
      },
      top_level_only: {
        type: 'boolean',
        description: 'If `true`, returns only top-level groups, excluding subgroups.',
      },
      marked_for_deletion_on: {
        type: 'string',
        description:
          'Return groups that are marked for deletion on this date. Premium and Ultimate only. Introduced in GitLab 17.1.',
      },
      active: {
        type: 'boolean',
        description: 'If `true`, returns only groups that are not archived and not marked for deletion.',
      },
      repository_storage: {
        type: 'string',
        description: 'Filter by repository storage used by the group. Administrators only. Premium and Ultimate only.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
      with_custom_attributes: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes custom attributes in the response. Administrators only.',
      },
      custom_attributes: {
        type: 'object',
        description:
          'Filter by custom attributes that match all of the specified key and value pairs. Administrators only.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/subgroups',
    query: [
      'statistics',
      'archived',
      'skip_groups',
      'all_available',
      'visibility',
      'search',
      'owned',
      'order_by',
      'sort',
      'min_access_level',
      'top_level_only',
      'marked_for_deletion_on',
      'active',
      'repository_storage',
      'page',
      'per_page',
      'with_custom_attributes',
      'custom_attributes',
    ],
  },
});
