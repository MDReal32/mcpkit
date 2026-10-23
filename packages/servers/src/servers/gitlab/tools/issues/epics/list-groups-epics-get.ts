import { defineTool } from '@usemcpkit/core';

export const issuesEpicsListGroupsEpicsGet = defineTool({
  name: 'issues:epics:list_groups_epics_get',
  description:
    'List all group epics. Lists all epics for a specified group and its subgroups. Responses are paginated and return 20 results by default.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      order_by: {
        type: 'string',
        default: 'created_at',
        enum: ['created_at', 'updated_at', 'title'],
        description: 'Sort results by the specified field.',
      },
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
      search: {
        type: 'string',
        description: 'Search epics for text present in the title or description.',
      },
      state: {
        type: 'string',
        default: 'all',
        enum: ['opened', 'closed', 'all'],
        description: 'Filter epics by state.',
      },
      author_id: {
        type: 'integer',
        description: 'Return epics authored by the user with the given ID. Mutually exclusive with `author_username`.',
      },
      author_username: {
        type: 'string',
        description: 'Return epics authored by the given username. Mutually exclusive with `author_id`.',
      },
      labels: {
        type: 'string',
        description:
          'Comma-separated list of label names. Label names from the epic group or a parent group can be used. (comma-separated)',
      },
      with_labels_details: {
        type: 'boolean',
        default: false,
        description:
          'If `true`, the response returns more details for each label in the labels field: `name`, `color`, `description`, `description_html`, `text_color`.',
      },
      created_after: {
        type: 'string',
        description: 'Return epics created on or after the specified time.',
      },
      created_before: {
        type: 'string',
        description: 'Return epics created on or before the specified time.',
      },
      updated_after: {
        type: 'string',
        description: 'Return epics updated on or after the specified time.',
      },
      updated_before: {
        type: 'string',
        description: 'Return epics updated on or before the specified time.',
      },
      include_ancestor_groups: {
        type: 'boolean',
        default: false,
        description: "If `true`, includes epics from the requested group's ancestors.",
      },
      include_descendant_groups: {
        type: 'boolean',
        default: true,
        description: "If `true`, includes epics from the requested group's descendants.",
      },
      my_reaction_emoji: {
        type: 'string',
        description:
          'Return epics reacted to by the authenticated user with the given emoji. `None` returns epics with no reaction and `Any` returns epics with at least one reaction.',
      },
      confidential: {
        type: 'boolean',
        description: 'If `true`, returns only confidential epics. If `false`, returns only non-confidential epics.',
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
      not: {
        type: 'object',
        description: 'Return epics that do not match the specified parameters.',
      },
      not_labels: {
        type: 'string',
        description: 'Comma-separated list of label names. (comma-separated)',
      },
      not_author_id: {
        type: 'integer',
        description:
          'Return epics not authored by the user with the given ID. Mutually exclusive with `not[author_username]`.',
      },
      not_author_username: {
        type: 'string',
        description: 'Return epics not authored by the given username. Mutually exclusive with `not[author_id]`.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/-/epics',
    query: {
      order_by: 'order_by',
      sort: 'sort',
      search: 'search',
      state: 'state',
      author_id: 'author_id',
      author_username: 'author_username',
      labels: 'labels',
      with_labels_details: 'with_labels_details',
      created_after: 'created_after',
      created_before: 'created_before',
      updated_after: 'updated_after',
      updated_before: 'updated_before',
      include_ancestor_groups: 'include_ancestor_groups',
      include_descendant_groups: 'include_descendant_groups',
      my_reaction_emoji: 'my_reaction_emoji',
      confidential: 'confidential',
      page: 'page',
      per_page: 'per_page',
      not: 'not',
      'not[labels]': 'not_labels',
      'not[author_id]': 'not_author_id',
      'not[author_username]': 'not_author_username',
    },
  },
});
