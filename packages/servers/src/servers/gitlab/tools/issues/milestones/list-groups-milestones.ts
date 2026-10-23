import { defineTool } from '@usemcpkit/core';

export const issuesMilestonesListGroupsMilestones = defineTool({
  name: 'issues:milestones:list_groups_milestones',
  description: 'List all group milestones. Lists all group milestones for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      state: {
        type: 'string',
        default: 'all',
        enum: ['active', 'closed', 'all'],
        description: 'Return "active", "closed", or "all" milestones',
      },
      iids: {
        type: 'string',
        description:
          'Return only the milestones having the given `iid`. Ignored if `include_ancestors` is `true`. (comma-separated)',
      },
      title: {
        type: 'string',
        description: 'The title of the milestones',
      },
      search: {
        type: 'string',
        description: 'The search criteria for the title or description of the milestone',
      },
      search_title: {
        type: 'string',
        description: 'The search criteria for the title of the milestone',
      },
      include_parent_milestones: {
        type: 'boolean',
        description:
          'If `true`, includes milestones from all parent groups. Deprecated. Use `include_ancestors` instead. Mutually exclusive with `include_ancestors`.',
      },
      include_ancestors: {
        type: 'boolean',
        description: 'Include milestones from all parent groups. Mutually exclusive with `include_parent_milestones`.',
      },
      updated_before: {
        type: 'string',
        description: 'Return milestones updated before the specified datetime. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ',
      },
      updated_after: {
        type: 'string',
        description: 'Return milestones updated after the specified datetime. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ',
      },
      containing_date: {
        type: 'string',
        description:
          'Return milestones where start_date <= containing_date <= due_date. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ',
      },
      start_date: {
        type: 'string',
        description:
          'Return milestones where due_date >= start_date. Requires end_date. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ',
      },
      end_date: {
        type: 'string',
        description:
          'Return milestones where start_date <= end_date. Requires start_date. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ',
      },
      sort: {
        type: 'string',
        default: 'due_date_asc',
        enum: [
          'due_date_asc',
          'due_date_desc',
          'start_date_asc',
          'start_date_desc',
          'name_asc',
          'name_desc',
          'created_asc',
          'created_desc',
          'updated_asc',
          'updated_desc',
        ],
        description: 'Return milestones sorted in the given order',
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
      include_descendants: {
        type: 'boolean',
        description: 'If `true`, includes milestones for the group and its descendants.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/milestones',
    query: [
      'state',
      'iids',
      'title',
      'search',
      'search_title',
      'include_parent_milestones',
      'include_ancestors',
      'updated_before',
      'updated_after',
      'containing_date',
      'start_date',
      'end_date',
      'sort',
      'page',
      'per_page',
      'include_descendants',
    ],
  },
});
