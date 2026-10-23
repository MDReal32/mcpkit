import { defineTool } from '@usemcpkit/core';

export const issuesIterationsListGroupsIterations = defineTool({
  name: 'issues:iterations:list_groups_iterations',
  description:
    'List all group iterations. Lists all iterations for a specified group. Iterations created by **Enable automatic scheduling** in iteration cadences return `null` for the `title` and `description` fields. This feature was introduced in GitLab 13.5.',
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
        enum: ['opened', 'upcoming', 'started', 'current', 'closed', 'all'],
        description: 'Filter iterations by state. Filtering by `started` is deprecated. Use `current` instead.',
      },
      search: {
        type: 'string',
        description: 'Return only iterations with a title matching the provided string.',
      },
      in: {
        type: 'string',
        description:
          'Fields to search with the `search` query. Possible values are `title` and `cadence_title`. (comma-separated)',
      },
      include_ancestors: {
        type: 'boolean',
        default: true,
        description: 'If `true`, includes iterations for the parent group and its ancestors.',
      },
      include_descendants: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes iterations for the parent group and its descendants.',
      },
      updated_before: {
        type: 'string',
        description: 'Return milestones updated before the specified datetime. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ',
      },
      updated_after: {
        type: 'string',
        description: 'Return milestones updated after the specified datetime. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ',
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
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/iterations',
    query: [
      'state',
      'search',
      'in',
      'include_ancestors',
      'include_descendants',
      'updated_before',
      'updated_after',
      'page',
      'per_page',
    ],
  },
});
