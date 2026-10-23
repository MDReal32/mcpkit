import { defineTool } from '@usemcpkit/core';

export const issuesLabelsListGroupsLabels = defineTool({
  name: 'issues:labels:list_groups_labels',
  description: 'List all group labels. Lists all group labels for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      with_counts: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes issue and merge request counts.',
      },
      include_ancestor_groups: {
        type: 'boolean',
        default: true,
        description: 'If `true`, includes ancestor groups.',
      },
      include_descendant_groups: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes descendant groups.',
      },
      only_group_labels: {
        type: 'boolean',
        default: true,
        description: 'If `true`, returns only group labels. If `false`, also returns project labels.',
      },
      search: {
        type: 'string',
        description: 'Keyword to filter labels by.',
      },
      archived: {
        type: 'boolean',
        description:
          'If `true`, returns only archived labels. If `false`, returns only non-archived labels. If omitted, returns all labels. Introduced in GitLab 18.10.',
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
    path: '/groups/{id}/labels',
    query: [
      'with_counts',
      'include_ancestor_groups',
      'include_descendant_groups',
      'only_group_labels',
      'search',
      'archived',
      'page',
      'per_page',
    ],
  },
});
